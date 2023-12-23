interface SwitchBotApiResponse {
    temperature: number;
    humidity: number;
}

interface Device {
    name: string;
    deviceId: string;
    deviceType: string;
}

function updateTemperatureAndHumidityData(): void {
    const spreadsheet = getSpreadsheet();
    const devices = getDevices(spreadsheet);
    const now = new Date();

    const dataSheet = prepareDataSheet(spreadsheet);

    devices.forEach((device: Device) => {
        const responseData = callSwitchBotApi(device.deviceId);
        if (responseData) {
            appendDeviceData(dataSheet, device, responseData, now);
        }
    });
}

function getSpreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    sheetName: string
) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        throw new Error(`「${sheetName}」シートが見つかりません。`);
    }
    return sheet;
}

function getDevices(
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

function prepareDataSheet(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
) {
    const dataSheet = getSheet(spreadsheet, 'Data');
    dataSheet.clear();
    dataSheet.appendRow(['デバイス', '温度（℃）', '湿度（%）', '取得日時']);
    return dataSheet;
}

function appendDeviceData(
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

function callSwitchBotApi(deviceId: string): SwitchBotApiResponse | null {
    const apiEndpoint = 'https://api.switch-bot.com';
    const apiToken = getApiToken();

    const response = UrlFetchApp.fetch(
        `${apiEndpoint}/v1.0/devices/${deviceId}/status`,
        { method: 'get', headers: { Authorization: apiToken } }
    );
    const json = JSON.parse(response.getContentText());

    if (json.statusCode === 100) {
        return {
            temperature: json.body.temperature,
            humidity: json.body.humidity,
        };
    } else {
        Logger.log('Error fetching data for device:', deviceId);
        return null;
    }
}

function getApiToken(): string {
    const apiToken =
        PropertiesService.getScriptProperties().getProperty('SwitchBotToken');
    if (!apiToken) {
        throw new Error('プロパティ「apiToken」が見つかりません。');
    }
    return apiToken;
}

updateTemperatureAndHumidityData();
