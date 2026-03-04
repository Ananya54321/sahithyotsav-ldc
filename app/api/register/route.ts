import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

// Canonical ordered list of events — must match eventsList in schedule.ts
const EVENTS = [
  "Youth Parliament",
  "Writers' Hunt",
  "Kaavya Manch",
  "Quiz Competition",
  "Alumni Talk",
  "Harry Potter Declamation",
];

// Sheet columns: Timestamp | Full Name | Email | Phone | College | Year | <one col per event>
const HEADER = ["Timestamp", "Full Name", "Email", "Phone", "College", "Year of Study", ...EVENTS];
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

async function getAllRows(sheets: ReturnType<typeof google.sheets>) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "A:M",
  });
  return res.data.values ?? [];
}

async function ensureHeader(sheets: ReturnType<typeof google.sheets>) {
  const rows = await getAllRows(sheets);
  if (rows.length === 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A1",
      valueInputOption: "RAW",
      requestBody: { values: [HEADER] },
    });
  }
}

/** Build a sheet row from form data. Events become TRUE/FALSE columns. */
function buildRow(
  timestamp: string,
  fullName: string,
  email: string,
  phone: string,
  college: string,
  yearOfStudy: string,
  events: string[]
): string[] {
  const eventCols = EVENTS.map((e) => (events.includes(e) ? "TRUE" : "FALSE"));
  return [timestamp, fullName, email, phone, college, yearOfStudy, ...eventCols];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, college, yearOfStudy, events, isEdit } =
      body as {
        fullName: string;
        email: string;
        phone: string;
        college: string;
        yearOfStudy: string;
        events: string[];
        isEdit?: boolean;
      };

    const sheets = await getSheet();
    await ensureHeader(sheets);

    const rows = await getAllRows(sheets);

    // Find if email already exists (skip header row at index 0)
    const existingRowIndex = rows.findIndex(
      (row, i) =>
        i > 0 && row[EMAIL_COL]?.toLowerCase() === email.toLowerCase()
    );

    if (!isEdit && existingRowIndex !== -1) {
      return NextResponse.json(
        {
          error:
            "This email is already registered. Please contact the organizers at cvrldc@gmail.com",
        },
        { status: 409 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const newRow = buildRow(timestamp, fullName, email, phone || "", college || "", yearOfStudy || "", events);

    if (isEdit && existingRowIndex !== -1) {
      // Update the existing row in-place (sheet rows are 1-indexed)
      const sheetRowNum = existingRowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `A${sheetRowNum}:M${sheetRowNum}`,
        valueInputOption: "RAW",
        requestBody: { values: [newRow] },
      });
      return NextResponse.json({ success: true, action: "updated" });
    }

    // New registration — append
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:M",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [newRow] },
    });

    return NextResponse.json({ success: true, action: "created" });
  } catch (err) {
    console.error("[register API] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
