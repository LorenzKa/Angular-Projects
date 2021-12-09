import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface DummyDataDto{
  intVal: number,
  stringVal : string
}
@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private urlBase = 'http://localhost:5000/values'
  constructor(private httpClient: HttpClient) { }
  getDummyData(): Observable<DummyDataDto>{
    return this.httpClient.get<DummyDataDto>(this.urlBase+"/dummy");
  }
}
