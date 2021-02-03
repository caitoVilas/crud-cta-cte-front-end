import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoDTO } from '../models/movimiento-dto';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movURL = 'http://localhost:8080/api/movimiento/'

  constructor(
    private http: HttpClient
  ) { }

  list(id: number, page: number, size: number, order: string, asc: boolean): Observable<any> {

    return this.http.get<any>(this.movURL + id  +  `?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  add(movimiento: MovimientoDTO): Observable<any> {

    return this.http.post<any>(this.movURL, movimiento);
  }
}
