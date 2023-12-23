export interface SwitchBotApiResponse {
    temperature: number;
    humidity: number;
}

export interface Device {
    name: string;
    deviceId: string;
    deviceType: string;
}
