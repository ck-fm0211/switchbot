import {
    getSpreadsheet,
    getDevices,
    prepareDataSheet,
    appendDeviceData,
} from './SpreadsheetService';
import { callSwitchBotApi } from './SwitchBotApi';
import { Device } from './models';

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
updateTemperatureAndHumidityData();
