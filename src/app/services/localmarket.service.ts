import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Company } from '../models/company';
import { LocalMarket } from '../models/localmarket';
const base_url=enviroment.base
@Injectable({
  providedIn: 'root'
})
export class LocalmarketService {
  private url=`${base_url}/localmarkets`
  private listaCambio = new Subject<LocalMarket[]>()
  
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<LocalMarket[]>(this.url)
  }

    insert(c:LocalMarket) {
    return this.http.post(this.url,c)
  }
  getList() {
    return this.listaCambio.asObservable
  }
  setList(listaNueva:LocalMarket[]){
    this.listaCambio.next(listaNueva);
  }
}
