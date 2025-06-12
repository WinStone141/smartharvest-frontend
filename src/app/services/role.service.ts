import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Role } from '../models/role';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { reqHandler } from '../../server';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class RoleService {
private url=`${base_url}/roles`
  private listaCambio = new Subject<Role[]>()
  
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Role[]>(this.url)
  }

    insert(r:Role) {
    return this.http.post(this.url,r)
  }
  getList() {
    return this.listaCambio.asObservable
  }
  setList(listaNueva:Role[]){
    this.listaCambio.next(listaNueva);
  }

  getUsers() {
      return this.http.get<Users[]>(`${base_url}/users`);
    }
}
