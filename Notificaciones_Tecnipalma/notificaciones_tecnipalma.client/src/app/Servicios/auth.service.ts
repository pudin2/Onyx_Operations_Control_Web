import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8050/api/auth/login';
  private tokenKey = 'authToken'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      usuario: username, 
      contraseña: password
    };
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Token guardado en localStorage:', response.token);
        } else {
          console.warn('Token no encontrado en la respuesta'); 
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); 
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); 
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

