import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
const base_url=enviroment.base
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url=`${base_url}/companies`
  
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Company[]>(this.url)
  }

}
