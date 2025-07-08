import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Role[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Role[]>(this.url);
  }

  insert(r: Role) {
    return this.http.post(`${base_url}/roles/registrar`, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }

  getUsers() {
    return this.http.get<Users[]>(`${base_url}/users`);
  }

  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
  update(a: Role) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
