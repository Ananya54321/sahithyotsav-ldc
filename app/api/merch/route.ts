import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
const SHEET_NAME = "Merch";

const HEADER = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "College",
  "Roll Number",
  "Year of Study",
  "Branch",
  "Custom Name for Mug",
  "UTR Number"
];

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

async function getAllRows(sheets: ReturnType<typeof google.sheets>) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_NAME}'!A:J`,
    });
    return res.data.values ?? [];
  } catch (err: any) {
    return [];
  }
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
      customName,
      utrNumber,
    } = body;

    const sheets = await getSheet();
    
    // ensure tab exists by trying to add header
    const rows = await getAllRows(sheets);
    if (rows.length === 0) {
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `'${SHEET_NAME}'!A1`,
          valueInputOption: "RAW",
          requestBody: { values: [HEADER] },
        });
      } catch (err: any) {
        if (err.message && err.message.includes("Unable to parse range")) {
          return NextResponse.json(
            { error: `Spreadsheet tab '${SHEET_NAME}' does not exist in Google Sheets. Please create it.` },
            { status: 500 }
          );
        }
        throw err;
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
      customName || "",
      utrNumber || ""
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_NAME}'!A:J`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [newRow] },
    });

    return NextResponse.json({ success: true, action: "created" });
  } catch (err: any) {
    console.error("[merch API] Error:", err.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
