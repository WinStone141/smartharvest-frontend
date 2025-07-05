import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalMarket } from '../models/localmarket';
import { Users } from '../models/users';
import { Inputs } from '../models/inputs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class InputService {
  private url = `${base_url}/inputs`
  private listaCambio = new Subject<Inputs[]>()

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Inputs[]>(this.url)
  }

  insert(i: Inputs) {
    return this.http.post(this.url, i)
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Inputs[]) {
    this.listaCambio.next(listaNueva);
  }
  getUsers() {
    return this.http.get<Users[]>(`${base_url}/users`);
  }
  listId(id: number) {
    return this.http.get<Inputs>(`${this.url}/${id}`);
  }
  update(a: Inputs) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
