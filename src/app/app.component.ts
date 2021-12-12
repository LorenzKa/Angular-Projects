import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  constructor(public authenticationService: AuthenticationService) {}
  isLoggedIn() : boolean {
     if( sessionStorage.getItem('currentUser')) return true;
     return false;
  }
  logout() : void{
    this.authenticationService.logout();
  }
}
