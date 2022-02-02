import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { StockControllerService } from 'src/app/core/stock-controller.service';
import { StockHubService } from 'src/app/core/stock-hub.service';
import { ShareDto } from 'src/app/model/shareDto';
import { ShareTickDto } from 'src/app/model/shareTickDto';
import { TransactionDto } from 'src/app/model/transactionDto';
import { UserDto } from 'src/app/model/userDto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stonks',
  templateUrl: './stonks.component.html',
  styleUrls: ['./stonks.component.scss']
})
export class StonksComponent implements OnInit {
  constructor(private currencyPipe: CurrencyPipe, private router: Router, private route: ActivatedRoute, private hubService: StockHubService, private controllerService: StockControllerService) { }
  usercounter: number = 0;
  name: string = "";
  messages: string[] = [];
  shares: ShareDto[] = [];
  user: UserDto = {} as UserDto;
  selectedShare: ShareDto = {} as ShareDto;
  amount: number = 1;
  sharePrices: ShareTickDto[] = [];
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  
  ngOnInit(): void {
    this.route.params.subscribe(params => { this.name = params.name });
    this.hubService.connect().subscribe(x => {
      this.hubService.sendLogin(this.name)
    });
    this.subscribeToHub();
    this.controllerService.getShares().subscribe(x => {
      this.shares = x
      x.forEach(share => {
        this.lineChartData.datasets.push({
          label: share.name,
          data: [],
          fill: 'origin'
        })
      })
    });
    this.getUser()
    this.hubService.onStockUpdate().subscribe(x => {
      this.sharePrices = x;
    });
  }
  logout(): void {
    this.hubService.sendLogout(this.name);
    this.router.navigateByUrl("");
  }
  private subscribeToHub(): void {
    this.hubService.onLogin().subscribe(x => {
      this.messages.push(`${x.name} has logged in`);
      this.usercounter = x.userCounter;
    });
    this.hubService.onLogout().subscribe(x => {
      this.messages.push(`${x.name} has logged out`);
      this.usercounter = x.userCounter;
    });
    this.hubService.onBuy().subscribe(x => {
      this.messages.push(`${x.username} bought ${x.amount} shares of ${x.shareName} at ${this.currencyPipe.transform(x.price, 'EUR', 'symbol', '1.2-2')}`);
      if(x.username == this.name){
        this.getUser()
      }
    });
    this.hubService.onSell().subscribe(x => {
      this.messages.push(`${x.username} sold ${x.amount} shares of ${x.shareName} at ${this.currencyPipe.transform(x.price, 'EUR', 'symbol', '1.2-2')}`);
      if(x.username == this.name){
        this.getUser()
      }
    });
  }
  buy(): void {
    var transaction : TransactionDto = {
      username: this.name,
      shareName: this.selectedShare.name,
      amount: this.amount,
      isUserBuy: true,
      price: this.sharePrices.find(x => x.name == this.selectedShare.name)!.val
    }
    this.hubService.sendBuy(transaction)
  }
  sell(): void {
    var transaction : TransactionDto = {
      username: this.name,
      shareName: this.selectedShare.name,
      amount: this.amount,
      isUserBuy: false,
      price: this.sharePrices.find(x => x.name == this.selectedShare.name)!.val
    }
    this.hubService.sendSell(transaction)
  }
  getUser(): void {
    this.controllerService.getUser(this.name).subscribe(x => this.user = x);
  }


}
