import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';

  constructor(private http: HttpClient) { }

  setUsername(username: string): void {
    this.username = username;
  }

  getDatosDelUsuario(username: string) {
    return this.http.get<any>(`http://localhost:8050/api/Usuarios/${username}`);
  }

  getUsername(): string {
    return this.username;
  }
}
