import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonDto } from './personDto';
import { Observable } from 'rxjs';
import { Regex } from './regex';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }
  getPersons(): Observable<PersonDto[]> {
    return this.http.get<PersonDto[]>('http://localhost:5000/Persons/persons')
  }
  getRegex(): Observable<Regex> {
    return this.http.get<Regex>('http://localhost:5000/Persons/regex')
  }
  addPerson(person: PersonDto): Observable<PersonDto> {
    {{person}}
    return this.http.post<PersonDto>('http://localhost:5000/Persons/person', person)
  }
}
