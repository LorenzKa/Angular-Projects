import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tip } from 'src/app/models/tipDto';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  BASE="http://157.90.25.13:5200"
  constructor(private http: HttpClient) { }
  public sendTip(tip: Tip) {
    tip.userId = Number.parseInt(sessionStorage.getItem("userId")!)
    tip.pwd = sessionStorage.getItem("pwd")!
    return this.http.post(`${this.BASE}/Tips`, tip)
  }
}
