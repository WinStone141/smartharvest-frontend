import { Role } from "./role";

export class UsersForRegister {
    id?: number;
    username:string="";
    password:string="";
    enabled:boolean=true;
    roles:Role[] = [];

    constructor() {
        
    }
}