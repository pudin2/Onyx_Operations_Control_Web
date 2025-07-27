import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VwOrdenTrabajo } from '../Models/OtModel';
import { CabSubT } from '../Models/SubTModel';
import { DetSubT } from '../Models/DetSubTModel';
import { Operario } from '../Models/OperarioModel'
import { TotalHoras } from '../Models/TotalHorasModel'

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = 'http://localhost:8050/api/ordenes'; 

  constructor(private http: HttpClient) { }

  getOrdenTrabajo(numeroOrden: number): Observable<VwOrdenTrabajo> {
    return this.http.get<VwOrdenTrabajo>(`${this.apiUrl}/${numeroOrden}`);
  }

  getSubTByNumeroOrden(numeroOrden: number): Observable<CabSubT[]> {
    return this.http.get<CabSubT[]>(`${this.apiUrl}/${numeroOrden}/subt`);
  }

  getSubTareaById(id: number): Observable<CabSubT> {
    return this.http.get<CabSubT>(`${this.apiUrl}/subtareas/${id}`);
  }

  getTotalHorasSubTarea(id: number): Observable<TotalHoras> {
    return this.http.get<TotalHoras>(`${this.apiUrl}/subtareas/${id}/totalhoras`);
  }

  getDetSubTBySubTareaId(subtareaId: number): Observable<DetSubT[]> {
    return this.http.get<DetSubT[]>(`${this.apiUrl}/subtareas/${subtareaId}/detalles`);
  }

  getCantidadMaterial(subtareaId: number): Observable<DetSubT[]> {
    return this.http.get<DetSubT[]>(`${this.apiUrl}/subtareas/${subtareaId}/restante`);
  }

  getOperarios(): Observable<Operario[]> {
    return this.http.get<Operario[]>(`${this.apiUrl}/operarios`);
  }

  guardarValores(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar`, datos);
  }

  guardarAnexo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar-anexo`, formData);
  }

  cerrarSubtarea(subtareaId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cerrar-subtarea`, { subtareaId });
  }

  copiarSubtarea(data: { Id: number, Descripcion: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/copiar`, data);
  }


}
