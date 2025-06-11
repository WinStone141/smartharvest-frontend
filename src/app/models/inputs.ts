import { Users } from "./users";

export class Inputs {
    idInput: number = 0;
    name: string = "";
    type: string = "";
    amount: number = 0;
    unit: string = "";
    registrationDate: Date = new Date();
    expirationDate: Date = new Date();
    users: Users = new Users(); 
}