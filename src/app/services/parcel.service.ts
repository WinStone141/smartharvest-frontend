import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Parcel } from '../models/parcel';
import { ParcelActive } from '../models/parcel-active.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { ParcelsByMonth } from '../models/parcelsbymonth';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  private url = `${base_url}/parcels`;
  private listaCambio = new Subject<Parcel[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Parcel[]>(this.url);
  }

  insert(p: Parcel) {
    return this.http.post(this.url, p);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Parcel[]) {
    this.listaCambio.next(listaNueva);
  }

  getUsers() {
    return this.http.get<Users[]>(`${base_url}/users`);
  }

  listId(id: number) {
    return this.http.get<Parcel>(`${this.url}/${id}`);
  }

  update(a: Parcel) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // PARCELAS ACTIVAS (ultimos 30 días)
  getActiveParcels() {
    return this.http.get<ParcelActive[]>(`${this.url}/findactiveparcels`);
  }

  getParcelsByMonth(year: number) {
    return this.http.get<ParcelsByMonth[]>(
      `${this.url}/parcelsbymonth/${year}`
    );
  }
}
