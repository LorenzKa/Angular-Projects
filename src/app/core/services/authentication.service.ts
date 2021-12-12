import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authenticationDto } from 'src/app/models/authenticationDto';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (private http: HttpClient) { }
  public login (username: string, password: string) : Observable<authenticationDto> {
    return this.http.post<authenticationDto>('https://localhost:7293/Authentication', {username: username, password: password}).pipe(tap(user => {
      if (user && user.token) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }
    }));
  }
  public logout () {
    sessionStorage.removeItem('currentUser');
    location.reload();
  }
}
