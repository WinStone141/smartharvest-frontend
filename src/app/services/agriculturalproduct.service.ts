import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AgriculturalProduct } from '../models/agriculturalproduct';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../models/sensor';
import { Crop } from '../models/crop';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AgriculturalproductService {
  private url = `${base_url}/agriculturalproducts`;
  private listaCambio = new Subject<AgriculturalProduct[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<AgriculturalProduct[]>(this.url);
  }

  insert(i: AgriculturalProduct) {
    return this.http.post(this.url, i);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: AgriculturalProduct[]) {
    this.listaCambio.next(listaNueva);
  }
  getCrops() {
    return this.http.get<Crop[]>(`${base_url}/crops`);
  }
  listId(id: number) {
    return this.http.get<AgriculturalProduct>(`${this.url}/${id}`);
  }
  update(a: AgriculturalProduct) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
