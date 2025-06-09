import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=enviroment.base
@Injectable({
  providedIn: 'root'
})
export class LocalmarketService {
  private url=`${base_url}/localmarkets`
  
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<[]>(this.url)
  }
}
