import { Role } from "./role";

export class Users {
    id?: number;
    username:string="";
    enabled:boolean=true;
    roles:Role[] = [];

    constructor() {
        
    }
}