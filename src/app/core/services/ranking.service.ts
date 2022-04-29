import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  BASE="http://157.90.25.13:5200"
  constructor(private http: HttpClient) { }

  getRanking(){
    return this.http.get<User[]>(`${this.BASE}/Wins/Ranklist`)
  }
}
