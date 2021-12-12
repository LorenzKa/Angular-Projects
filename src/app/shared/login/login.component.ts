import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { authenticationDto } from 'src/app/models/authenticationDto';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  returnUrl: any = '/';
  response: authenticationDto = {username: "", token: ""};
  constructor(private authenticationService: AuthenticationService, private router : Router, private route : ActivatedRoute) { }
  login(): void{
    this.authenticationService.login(this.username, this.password).subscribe(x => this.router.navigate([this.returnUrl]))
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot?.queryParams?.returnUrl || '/secret';
  }

}
