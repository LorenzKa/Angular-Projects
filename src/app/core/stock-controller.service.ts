import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareDto } from '../model/shareDto';
import { UserDto } from '../model/userDto';

@Injectable({
  providedIn: 'root'
})
export class StockControllerService {
  constructor(private http: HttpClient) { }
  getShares(): Observable<ShareDto[]>{
    return this.http.get<ShareDto[]>('https://localhost:7174/api/Stock/GetShares');
  }
  getUser(name: string): Observable<UserDto>{
    return this.http.get<UserDto>('https://localhost:7174/api/Stock/GetUser/'+name);
  }
}
