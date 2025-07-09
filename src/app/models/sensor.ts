import { Crop } from "./crop";
import { Parcel } from "./parcel";

export class Sensor {
    idSensor: number = 0;
    sensorType: string = "";
    installationDate: Date = new Date();
    state: boolean = false;
    lastLecture: Date = new Date();
    batteryLevel: number = 0;
    parcel: Parcel = new Parcel();
    humidity: number = 0;
}