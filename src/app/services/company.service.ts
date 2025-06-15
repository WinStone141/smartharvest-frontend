import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Subject } from 'rxjs';
const base_url=enviroment.base
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url=`${base_url}/companies`
  private listaCambio = new Subject<Company[]>()

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Company[]>(this.url)
  }

    insert(c:Company) {
    return this.http.post(this.url,c)
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Company[]){
    this.listaCambio.next(listaNueva);
  }
    listId(id: number) {
    return this.http.get<Company>(`${this.url}/${id}`);
  }
  update(a: Company) {
    return this.http.put(this.url, a);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
