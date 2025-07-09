import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../models/recommendation';
import { Crop } from '../models/crop';
import { Users } from '../models/users';
import { RecommendationsByMonthInYear } from '../models/recommendationsbymonth';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private url = `${base_url}/recommendations`;
  private listaCambio = new Subject<Recommendation[]>();

  constructor(private http: HttpClient) {}

  list(idUsuario: number): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(
      `${this.url}/listarporiduser/${idUsuario}`
    );
  }

  insert(r: Recommendation) {
    return this.http.post(this.url, r);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Recommendation[]) {
    this.listaCambio.next(listaNueva);
  }

  getCrops(idUsuario: number): Observable<Crop[]> {
    return this.http.get<Crop[]>(
      `${base_url}/crops/listarporidusuario/${idUsuario}`
    );
  }

  listId(id: number) {
    return this.http.get<Recommendation>(`${this.url}/${id}`);
  }

  update(r: Recommendation) {
    return this.http.put(this.url, r);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getRecommendationsByMonth(
    year: number
  ): Observable<RecommendationsByMonthInYear[]> {
    return this.http.get<RecommendationsByMonthInYear[]>(
      `${this.url}/recommendationsbymonth/${year}`
    );
  }
}
