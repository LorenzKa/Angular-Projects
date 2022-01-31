import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockHubService } from 'src/app/core/stock-hub.service';
import { transactionDto } from 'src/app/model/transactionDto';

@Component({
  selector: 'app-stonks',
  templateUrl: './stonks.component.html',
  styleUrls: ['./stonks.component.scss']
})
export class StonksComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: StockHubService) { }

  name: string = "";
  messages: string[] = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => { this.name = params.name });
    this.service.connect().subscribe(x => {
      this.service.sendLogin(this.name)
    });
    this.service.onLogin().subscribe(x => {
      this.messages.push(`${x} has logged in`);
    });
  }

}
