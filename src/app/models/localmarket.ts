import { Users } from "./users";

export class LocalMarket {
  idLocalMarket: number = 0;
  name: string = '';
  location: string = '';
  contact: string = '';
  attentionDate: Date = new Date();
  users: Users = new Users();
}