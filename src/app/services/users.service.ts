import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Users } from '../models/users';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersForRegister } from '../models/usersforregister';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url=`${base_url}/users`
  private listaCambio = new Subject<Users[]>()
  
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Users[]>(this.url)
  }

    insert(u:UsersForRegister) {
    return this.http.post(`${base_url}/users/register`,u)
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Users[]){
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
          return this.http.get<Users>(`${this.url}/${id}`);
      }
  update(a: Users) {
        return this.http.put(this.url, a);
          }
        
          deleteA(id: number) {
            return this.http.delete(`${this.url}/${id}`);
          }
}
