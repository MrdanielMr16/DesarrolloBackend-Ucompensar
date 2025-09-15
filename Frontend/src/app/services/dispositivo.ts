import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private apiUrl = 'http://localhost:3000/api/dispositivos';

  constructor(private http: HttpClient) {}

  getDispositivos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDispositivo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
