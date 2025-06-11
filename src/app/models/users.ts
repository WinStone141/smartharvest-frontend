import { Role } from "./role";

export class Users {
    id: number = 0;
    username:string="";
    password:string="";
    enabled:boolean=false;
    roles:Role[] = [];

    constructor() {
        
    }
}