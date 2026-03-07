import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

const HEADER = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "College",
  "Roll Number",
  "Year of Study",
  "Branch",
  "UTR Number"
];
const EMAIL_COL = 2; // 0-indexed column C

function getAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
  const key = JSON.parse(keyJson);
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function getSheet() {
  const auth = getAuth();
  return google.sheets({ version: "v4", auth });
}

async function getAllRows(sheets: ReturnType<typeof google.sheets>, sheetName: string) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${sheetName}'!A:J`,
    });
    return res.data.values ?? [];
  } catch (err: any) {
    // Return empty if the sheet does not exist or has no data, we will let the ensureHeader/append handle failure
    return [];
  }
}

async function isUtrUsedAcrossSheets(sheets: ReturnType<typeof google.sheets>, utrNumber: string): Promise<boolean> {
  if (!utrNumber) return false;
  
  try {
    const allSheetsRes = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    const sheetNames = allSheetsRes.data.sheets?.map((s) => s.properties?.title).filter(Boolean) as string[];

    const ranges = sheetNames.map(name => `'${name}'!A:J`);
    
    if (ranges.length === 0) return false;

    const batchRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SPREADSHEET_ID,
      ranges,
    });
    
    const valueRanges = batchRes.data.valueRanges || [];
    for (const vr of valueRanges) {
      const rows = vr.values || [];
      if (rows.length === 0) continue;
      
      const headers = rows[0] || [];
      const utrColIndex = headers.findIndex((h) => h && h.toString().toLowerCase().includes("utr"));
      
      if (utrColIndex !== -1) {
        for (let i = 1; i < rows.length; i++) {
          const rowUtr = rows[i][utrColIndex];
          if (rowUtr && rowUtr.toString().trim() === utrNumber.trim()) {
            return true;
          }
        }
      }
    }
  } catch (e) {
    console.error("Error fetching UTRs across sheets:", e);
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      college,
      rollNumber,
      yearOfStudy,
      branch,
      selectedEvent,
      utrNumber,
      isEdit,
    } = body;

    if (!selectedEvent) {
      return NextResponse.json({ error: "No event selected. Please select an event." }, { status: 400 });
    }

    const sheetNameMapping: Record<string, string> = {
      "Youth Parliament": "Youth Parliament",
      "Book Fair Stall": "Book Fair Stall",
      "Workshop – Engaging Public Speaking": "WS – Engaging Public Speaking",
      "Writers' Hunt: The Literary Quest Competition": "Writers' Hunt",
      "Workshop – Emotional Intelligence in the Time of Artificial Intelligence": "WS – EI in the Time of AI",
      "Alumni Talk": "Alumni Talk",
      "Kaavya Manch – Open Mic Poetry": "Kaavya Manch",
      "Declamation on Harry Potter Series Competition": "Declamation on HP"
    };

    const sheets = await getSheet();
    const sheetName = sheetNameMapping[selectedEvent] || selectedEvent;
    
    // ensure tab exists by trying to add header
    const rows = await getAllRows(sheets, sheetName);
    if (rows.length === 0) {
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `'${sheetName}'!A1`,
          valueInputOption: "RAW",
          requestBody: { values: [HEADER] },
        });
      } catch (err: any) {
        if (err.message && err.message.includes("Unable to parse range")) {
          return NextResponse.json(
            { error: `Spreadsheet tab '${sheetName}' does not exist in Google Sheets. Please create it.` },
            { status: 500 }
          );
        }
        throw err;
      }
    }

    // Refresh rows after ensuring header
    const updatedRows = await getAllRows(sheets, sheetName);

    const existingRowIndex = updatedRows.findIndex(
      (row, i) => i > 0 && row[EMAIL_COL]?.toLowerCase() === email.toLowerCase()
    );

    if (!isEdit && existingRowIndex !== -1) {
      return NextResponse.json(
        {
          error:
            "This email is already registered for this event. Please contact the organizers at cvrldc@gmail.com",
        },
        { status: 409 }
      );
    }

    let previousUtr = "";
    if (existingRowIndex !== -1) {
       previousUtr = updatedRows[existingRowIndex][8] || "";
    }

    if (utrNumber && (!isEdit || utrNumber.trim() !== previousUtr.trim())) {
      const isUsed = await isUtrUsedAcrossSheets(sheets, utrNumber);
      if (isUsed) {
        return NextResponse.json(
          { error: "This UTR number has already been used. Please provide a valid, unique 12-digit UTR." },
          { status: 400 }
        );
      }
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const newRow = [
      timestamp,
      fullName || "",
      email || "",
      phone || "",
      college || "",
      rollNumber || "",
      yearOfStudy || "",
      branch || "",
      utrNumber || ""
    ];

    if (isEdit && existingRowIndex !== -1) {
      const sheetRowNum = existingRowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${sheetName}'!A${sheetRowNum}:J${sheetRowNum}`,
        valueInputOption: "RAW",
        requestBody: { values: [newRow] },
      });
      return NextResponse.json({ success: true, action: "updated" });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${sheetName}'!A:J`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [newRow] },
    });

    return NextResponse.json({ success: true, action: "created" });
  } catch (err: any) {
    console.error("[register API] Error:", err.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
