import { Sensor } from "./sensor";

export class Maintenance{
idMaintenance: number = 0;
installationDate: Date = new Date();
tipoMantenimiento: string = ""; //50 caracteres
description: string = "";  // 200 caracteres
sensor: Sensor = new Sensor ();
}