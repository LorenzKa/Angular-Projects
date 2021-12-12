import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasesFederalStates } from 'src/app/models/casesFederalStates';
import { DeltaData } from 'src/app/models/DeltaData';
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  constructor(private http: HttpClient) { }

  getDeltaData() : Observable<DeltaData[]> {
    return this.http.get<DeltaData[]>('https://localhost:7293/Covid/GetDelta')
  }
  getCasesForFederalStates(id: number) : Observable<CasesFederalStates[]>{
    return this.http.get<CasesFederalStates[]>('https://localhost:7293/Covid/GetCasesForFederalState/'+id)
  }
  
}
