import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';

  constructor(private http: HttpClient) { }

  // Guardar el username
  setUsername(username: string): void {
    this.username = username;
  }

  // auth.service.ts o donde quieras hacer la consulta
  getDatosDelUsuario(username: string) {
    return this.http.get<any>(`http://localhost:8050/api/Usuarios/${username}`);
  }

  // Obtener el username
  getUsername(): string {
    return this.username;
  }
}
