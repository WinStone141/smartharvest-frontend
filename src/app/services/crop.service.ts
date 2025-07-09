import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Crop } from '../models/crop';
import { HttpClient } from '@angular/common/http';
import { Parcel } from '../models/parcel';
import { CropsNeedingAttention } from '../models/crops-needing-attention.model';
import { CropByState } from '../models/cropbystate';
import { HarvestByCropType } from '../models/harvestbycroptype';
const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class CropService {
  private url = `${base_url}/crops`;
  private listaCambio = new Subject<Crop[]>();

  constructor(private http: HttpClient) {}

  list(idUsuario: number): Observable<Crop[]> {
    return this.http.get<Crop[]>(`${this.url}/listarporidusuario/${idUsuario}`);
  }

  insert(c: Crop) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Crop[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Crop>(`${this.url}/${id}`);
  }
  update(a: Crop) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getParcels(idUsuario: number): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(
      `${base_url}/parcels/listarporiduser/${idUsuario}`
    );
  }

  //Query 1
  getCropsNeedingAttention() {
    return this.http.get<CropsNeedingAttention[]>(`${this.url}/cropsInDanger`);
  }

  getCropsByState(): Observable<CropByState[]> {
    return this.http.get<CropByState[]>(`${this.url}/by-state`);
  }

  getHarvestByCropTypeInRange(
    startdate: string,
    enddate: string
  ): Observable<HarvestByCropType[]> {
    return this.http.get<HarvestByCropType[]>(
      `${this.url}/harvestbycroptypeinrange/${startdate}/${enddate}`
    );
  }
}
