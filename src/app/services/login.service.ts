import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSubject = new BehaviorSubject<boolean>(this.tokenPresente());

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    //return this.http.post('http://localhost:8083/login', request);
    return this.http.post(`${environment.base}/login`, request);
    
  }

  // Verifica si hay token (internamente usado por el subject)
  private tokenPresente(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  verificar(): boolean {
    return this.loginSubject.value;
  }

  loginSuccess(token: string) {
    sessionStorage.setItem('token', token);
    this.loginSubject.next(true); // Notifica login
  }

  logout() {
    sessionStorage.removeItem('token');
    this.loginSubject.next(false); // Notifica logout
  }

  showRole(): string {
    const token = sessionStorage.getItem('token');
    if (!token) return '';
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role || '';
  }

  // Permite suscribirse al estado de login
  getLoginStatus(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }
}