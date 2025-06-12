import { Users } from "./users";

export class Parcel {
    idParcel?: number;
    name: string = "";
    location: string = "";
    sizem2: number = 0;
    groundType: string = "";
    registrationDate: Date = new Date();
    users: Users = new Users(); 
}