import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonafisicaDTO } from '../models/personafisica-dto';
import { PersonaFisica } from '../models/persona-fisica';

@Injectable({
  providedIn: 'root'
})
export class PersonasFisicasService {

  fisicaURL = 'http://localhost:8080/api/persona-fisica/'

  constructor(
    private http : HttpClient
  ) { }

  list(page: number, size: number, order: string, asc: boolean): Observable<any> {

 return this.http.get<any>(this.fisicaURL +  `?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  // return this.http.get<any>(this.fisicaURL );
  }

  add(persona: PersonafisicaDTO): Observable<any> {

    return this.http.post<any>(this.fisicaURL, persona);
  }

  get(id:number): Observable<PersonaFisica> {

    return this.http.get<PersonaFisica>(this.fisicaURL  + id);
  }

  listAll(): Observable<PersonaFisica[]> {

    return this.http.get<PersonaFisica[]>(this.fisicaURL + 'all');
  }

 delete(id: number): Observable <any>{

    return this.http.delete<any>(this.fisicaURL + id);
  }
}
