import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LastRound } from 'src/app/models/lastRound';
import { CurrentRound } from 'src/app/models/roundDto';

@Injectable({
  providedIn: 'root'
})
export class DrawsService {
  BASE="http://157.90.25.13:5200"
  constructor(private http: HttpClient) { }

  currentRound() {
    return this.http.get<CurrentRound>(`${this.BASE}/Draws/CurrentRound`)
  }
  lastRound() {
    return this.http.get<LastRound>(`${this.BASE}/Draws/LastRound`)
  }
  round(roundNumber: number) {
    return this.http.get<LastRound>(`${this.BASE}/Draws/Round/${roundNumber}`)
  }
}
