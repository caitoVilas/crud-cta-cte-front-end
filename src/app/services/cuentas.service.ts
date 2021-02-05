import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuentas } from '../models/cuentas';
import { CuentasDTO } from '../models/cuentas-dto';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  cuentasURL = 'http://localhost:8080/api/cuentas/';

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<any> {

    return this.http.get<any>(this.cuentasURL);
  }

  add(cuenta: CuentasDTO): Observable<any> {

    return this.http.post<any>(this.cuentasURL, cuenta);
  }

  get(id: number): Observable<Cuentas> {

    return this.http.get<Cuentas>(this.cuentasURL + id);
  }

  delete(id: number): Observable<any> {

    return this.http.delete<any>(this.cuentasURL + id)
  }
}
