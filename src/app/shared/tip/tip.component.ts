import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/app/core/services/tips.service';
import { Tip } from 'src/app/models/tipDto';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  constructor(private tipService: TipsService) { }
  tip: Tip = {} as Tip
  ngOnInit(): void {
  }
  sendBet () {
    this.tipService.sendTip(this.tip).subscribe(x => console.log(x));
  }
  generateBet(){
    this.tip.z1 = Math.floor(Math.random()*45)
    this.tip.z2 = Math.floor(Math.random()*45)
    this.tip.z3 = Math.floor(Math.random()*45)
    this.tip.z4 = Math.floor(Math.random()*45)
    this.tip.z5 = Math.floor(Math.random()*45)
    this.tip.z6 = Math.floor(Math.random()*45)
  }

}
