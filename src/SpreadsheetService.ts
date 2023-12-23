import { Device, SwitchBotApiResponse } from './models';

export function getSpreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
}

export function getSheet(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    sheetName: string
) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        throw new Error(`「${sheetName}」シートが見つかりません。`);
    }
    return sheet;
}

export function getDevices(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): Device[] {
    const devicesSheet = getSheet(spreadsheet, 'devices');
    return devicesSheet
        .getDataRange()
        .getValues()
        .slice(1)
        .map((row: string[]) => ({
            name: row[0],
            deviceId: row[1],
            deviceType: row[2],
        }));
}

export function prepareDataSheet(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
) {
    const dataSheet = getSheet(spreadsheet, 'Data');
    dataSheet.clear();
    dataSheet.appendRow(['デバイス', '温度（℃）', '湿度（%）', '取得日時']);
    return dataSheet;
}

export function appendDeviceData(
    dataSheet: GoogleAppsScript.Spreadsheet.Sheet,
    device: Device,
    responseData: SwitchBotApiResponse,
    now: Date
) {
    dataSheet.appendRow([
        device.name,
        responseData.temperature,
        responseData.humidity,
        now,
    ]);
}
