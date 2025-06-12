import { Users } from "./users";

export class Role{
    id?:number;
    rol:string="";
    user:Users=new Users();

    constructor() {
        
    }
}