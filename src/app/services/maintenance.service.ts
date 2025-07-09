import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../models/sensor';
import { Maintenance } from '../models/maintenance';
import { TopParcelsByMaintenance } from '../models/topcropsbymaintenance';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private url = `${base_url}/maintenances`;

  private listaCambio = new Subject<Maintenance[]>();

  constructor(private http: HttpClient) {}

  list(idUsuario: number): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(
      `${this.url}/listarporiduser/${idUsuario}`
    );
  }

  insert(m: Maintenance) {
    return this.http.post(this.url, m);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Maintenance[]) {
    this.listaCambio.next(listaNueva);
  }

  getSensors(idUsuario: number): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(
      `${base_url}/sensors/listarporiduser/${idUsuario}`
    );
  }
  listId(id: number) {
    return this.http.get<Maintenance>(`${this.url}/${id}`);
  }
  update(a: Maintenance) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getParcelsByMaintenance(
    idUser: number
  ): Observable<TopParcelsByMaintenance[]> {
    return this.http.get<TopParcelsByMaintenance[]>(
      `${this.url}/top-parcelas-mantenimientos/${idUser}`
    );
  }
}
