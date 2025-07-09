import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AgriculturalProduct } from '../models/agriculturalproduct';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Crop } from '../models/crop';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AgriculturalproductService {
  private url = `${base_url}/agriculturalproducts`;
  private listaCambio = new Subject<AgriculturalProduct[]>();

  constructor(private http: HttpClient) {}

  list(idUsuario: number): Observable<AgriculturalProduct[]> {
    return this.http.get<AgriculturalProduct[]>(
      `${this.url}/listarporidusuario/${idUsuario}`
    );
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
  getCrops(idUsuario: number): Observable<Crop[]> {
    return this.http.get<Crop[]>(
      `${base_url}/crops/listarporidusuario/${idUsuario}`
    );
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
