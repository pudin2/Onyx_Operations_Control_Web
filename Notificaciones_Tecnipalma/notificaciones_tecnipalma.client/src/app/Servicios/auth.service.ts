import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      usuario: username, // Aquí ajustamos el nombre del campo
      contraseña: password
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
