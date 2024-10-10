import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VwOrdenTrabajo } from '../Models/OtModel';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = 'http://localhost:5000/api/ordenes'; // Ajusta la URL a la de tu API

  constructor(private http: HttpClient) { }

  getOrdenTrabajo(numeroOrden: number): Observable<VwOrdenTrabajo> {
    return this.http.get<VwOrdenTrabajo>(`${this.apiUrl}/${numeroOrden}`);
  }
}
