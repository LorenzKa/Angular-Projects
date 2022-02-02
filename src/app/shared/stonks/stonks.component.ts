import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockControllerService } from 'src/app/core/stock-controller.service';
import { StockHubService } from 'src/app/core/stock-hub.service';
import { ShareDto } from 'src/app/model/shareDto';
import { TransactionDto } from 'src/app/model/transactionDto';
import { UserDto } from 'src/app/model/userDto';

@Component({
  selector: 'app-stonks',
  templateUrl: './stonks.component.html',
  styleUrls: ['./stonks.component.scss']
})
export class StonksComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private hubService: StockHubService, private controllerService: StockControllerService) { }
  usercounter: number = 0;
  name: string = "";
  messages: string[] = [];
  shares: ShareDto[] = [];
  user: UserDto = {} as UserDto;
  selectedShare: ShareDto = {} as ShareDto;
  ngOnInit(): void {
    this.route.params.subscribe(params => { this.name = params.name });
    this.hubService.connect().subscribe(x => {
      this.hubService.sendLogin(this.name)
    });
    this.subscribeToHub();
    this.controllerService.getShares().subscribe(x => this.shares = x);
    this.controllerService.getUser(this.name).subscribe(x => this.user = x);
  }
  logout(): void {
    this.hubService.sendLogout(this.name);
    this.router.navigateByUrl("");
  }
  private subscribeToHub(): void{
    this.hubService.onLogin().subscribe(x => {
      this.messages.push(`${x.name} has logged in`);
      this.usercounter = x.userCounter;
    });
    this.hubService.onLogout().subscribe(x => {
      this.messages.push(`${x.name} has logged out`);
      this.usercounter = x.userCounter;
    });
  }

}
