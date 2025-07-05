import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../models/recommendation';
import { Crop } from '../models/crop';
import { Users } from '../models/users';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private url = `${base_url}/recommendations`;
  private listaCambio = new Subject<Recommendation[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Recommendation[]>(this.url)
  }

  insert(r: Recommendation) {
    return this.http.post(this.url, r)
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Recommendation[]) {
    this.listaCambio.next(listaNueva);
  }

  getUsers() {
    return this.http.get<Users[]>(`${base_url}/users`);
  }

  getCrops() {
    return this.http.get<Crop[]>(`${base_url}/crops`);
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
}
