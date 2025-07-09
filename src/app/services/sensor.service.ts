import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sensor } from '../models/sensor';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Parcel } from '../models/parcel';
import { Crop } from '../models/crop';
import { CountMaintenanceSensor } from '../models/countmaintenancesensor';
import { Typesensoractive } from '../models/typesensoractive';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private url = `${base_url}/sensors`;
  private listaCambio = new Subject<Sensor[]>();

  constructor(private http: HttpClient) {}

  list(idUsuario: number): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.url}/listarporiduser/${idUsuario}`);
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
  getParcels(idUsuario: number): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(
      `${base_url}/parcels/listarporiduser/${idUsuario}`
    );
  }
  getCrops() {
    return this.http.get<Crop[]>(`${base_url}/crops`);
  }
  getMaintenanceCountbySensorType(): Observable<CountMaintenanceSensor[]> {
    return this.http.get<CountMaintenanceSensor[]>(
      `${this.url}/countmaintenancesensor`
    );
  }

  getActiveSensorbySensorType(): Observable<Typesensoractive[]> {
    return this.http.get<Typesensoractive[]>(
      `${this.url}/SensorsWithMaintenanceByType`
    );
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
