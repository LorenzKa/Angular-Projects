import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeltaData } from 'src/Dto/DeltaData';
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  constructor(private http: HttpClient) { }

  getDeltaData() : Observable<DeltaData[]> {
    return this.http.get<DeltaData[]>('https://localhost:7293/Covid/GetDelta')
  }
  
}
