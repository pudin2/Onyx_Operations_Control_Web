import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth/login';
  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      usuario: username, // Aquí ajustamos el nombre del campo
      contraseña: password
    };
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Token guardado en localStorage:', response.token);
        }else {
          console.warn('Token no encontrado en la respuesta'); // Mensaje si no encuentra el token
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Devuelve true si hay un token
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Elimina el token de localStorage
  }

  // Método para obtener el token de autenticación
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

