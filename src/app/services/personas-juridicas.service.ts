import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaJuridica } from '../models/persona-juridica';
import { PersonaJuridicaDTO } from '../models/persona-juridica-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonasJuridicasService {

  juridiaURL = 'http://localhost:8080/api/persona-juridica/';

  constructor(
    private http: HttpClient
  ) { }

  list(page:number, size:number, order: string, asc: boolean): Observable<any> {

    return this.http.get<any>(this.juridiaURL + `?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  add(persona: PersonaJuridicaDTO): Observable<any> {

    return this.http.post<any>(this.juridiaURL, persona);
  }

  get(id: number): Observable<PersonaJuridica> {

    return this.http.get<PersonaJuridica>(this.juridiaURL + id);
  }

  listAll(): Observable<PersonaJuridica[]> {

    return this.http.get<PersonaJuridica[]>(this.juridiaURL + 'all');
  }

  delete(id: number): Observable<any> {

    return this.http.delete<any>(this.juridiaURL + id);
  }
}
