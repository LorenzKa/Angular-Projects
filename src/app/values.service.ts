import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DummyDataDto } from './DummyDataDto';
@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private urlBase = 'http://localhost:5075/values'
  constructor(private httpClient: HttpClient) { }
  getDummyData(): Observable<DummyDataDto>{
    console.log("getDummyData");
    return this.httpClient.get<DummyDataDto>(this.urlBase+"/dummy");
  }
}
