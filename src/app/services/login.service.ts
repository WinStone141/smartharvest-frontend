import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSubject = new BehaviorSubject<boolean>(this.tokenPresente());
  private userIdSubject = new BehaviorSubject<number | null>(
    this.getCurrentUserId()
  );

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8083/login', request);
  }

  private tokenPresente(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  verificar(): boolean {
    return this.loginSubject.value;
  }

  loginSuccess(token: string) {
    sessionStorage.setItem('token', token);

    // DEBUG: Mostrar el contenido completo del token
    console.log('Token recibido:', token);

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log('Token decodificado completo:', decodedToken);

      // Mostrar todas las propiedades del token
      console.log('Propiedades del token:', Object.keys(decodedToken));
    } catch (error) {
      console.error('Error al decodificar token para debug:', error);
    }

    const userId = this.extractUserIdFromToken(token);
    console.log('UserId extraído:', userId);

    if (userId) {
      sessionStorage.setItem('userId', userId.toString());
      this.userIdSubject.next(userId);
    } else {
      //console.error('No se pudo extraer el userId del token');
    }

    this.loginSubject.next(true);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.userIdSubject.next(null);
    this.loginSubject.next(false);
  }

  showRole(): string {
    const token = sessionStorage.getItem('token');
    if (!token) return '';
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role || '';
  }

  private extractUserIdFromToken(token: string): number | null {
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);

      console.log('Token decodificado:', decodedToken);

      const userId = decodedToken['id'];
      if (typeof userId === 'number') return userId;
      if (typeof userId === 'string' && !isNaN(Number(userId)))
        return Number(userId);

      //console.error('Campo "id" no encontrado o inválido en el token');
      return null;
    } catch (error) {
      console.error('Error al extraer userId del token:', error);
      return null;
    }
  }

  getCurrentUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    const result = userId ? parseInt(userId) : null;
    console.log('getCurrentUserId result:', result);
    return result;
  }

  getCurrentUsername(): string | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.username || decodedToken?.sub || null;
    } catch (error) {
      console.error('Error al obtener username:', error);
      return null;
    }
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  isTokenValid(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    try {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }

  updateUserId(id: number) {
    this.userIdSubject.next(id);
  }
}
