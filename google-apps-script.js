const SHEET_ID = "1Fdde4jIIDt5bQh0fM_WO2FDVBONYGQRlq9AwkGh8A5A";
const SHEET_NAME = "Requests";

function doGet() {
  return ContentService.createTextOutput("Birthday request endpoint is ready.");
}

function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = getOrCreateSheet(spreadsheet, SHEET_NAME);
  const params = e.parameter || {};

  ensureHeader(sheet);

  sheet.appendRow([
    new Date(),
    params.recipient || "",
    params.request || "",
    params.source || "",
    params.sheetUrl || ""
  ]);

  return ContentService.createTextOutput("OK");
}

function getOrCreateSheet(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow([
    "Thời gian",
    "Người nhận",
    "Yêu cầu",
    "Nguồn",
    "Link bảng"
  ]);
}
