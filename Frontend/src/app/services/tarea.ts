import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/api/tareas';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear nueva tarea
  addTarea(nombre: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nombre });
  }
}
