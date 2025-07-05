import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sensor } from '../models/sensor';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Parcel } from '../models/parcel';
import { Crop } from '../models/crop';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private url = `${base_url}/sensors`;
  private listaCambio = new Subject<Sensor[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Sensor[]>(this.url);
  }

  insert(s: Sensor) {
    return this.http.post(this.url, s);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Sensor[]) {
    this.listaCambio.next(listaNueva);
  }
  getParcels() {
    return this.http.get<Parcel[]>(`${base_url}/parcels`);
  }
  getCrops() {
    return this.http.get<Crop[]>(`${base_url}/crops`);
  }
  listId(id: number) {
    return this.http.get<Sensor>(`${this.url}/${id}`);
  }
  update(a: Sensor) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
