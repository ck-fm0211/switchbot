import { SwitchBotApiResponse } from './models';

export function callSwitchBotApi(
    deviceId: string
): SwitchBotApiResponse | null {
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
