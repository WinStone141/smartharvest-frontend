import { Sensor } from "./sensor";

export class Maintenance {
    idMaintenance: number = 0;
    installationDate: Date = new Date();
    tipoMantenimiento: string = "";
    description: string = "";
    sensor: Sensor = new Sensor();
}
