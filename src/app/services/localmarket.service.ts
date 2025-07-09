import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LocalMarket } from '../models/localmarket';
const base_url=environment.base
@Injectable({
  providedIn: 'root',
})
export class LocalmarketService {
  private url = `${base_url}/localmarkets`;
  private listaCambio = new Subject<LocalMarket[]>();

  constructor(private http: HttpClient) {}

  list(idUsuario: number): Observable<LocalMarket[]> {
    return this.http.get<LocalMarket[]>(
      `${this.url}/listarporiduser/${idUsuario}`
    );
  }

  insert(c: LocalMarket) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: LocalMarket[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<LocalMarket>(`${this.url}/${id}`);
  }
  update(a: LocalMarket) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
