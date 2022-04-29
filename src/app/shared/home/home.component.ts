import { Component, OnInit } from '@angular/core';
import { DrawsService } from 'src/app/core/services/draws.service';
import { LastRound } from 'src/app/models/lastRound';
import { CurrentRound } from 'src/app/models/roundDto';
import { interval, Observable, timer } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private drawService: DrawsService) { }
  currentDraw : CurrentRound = {} as CurrentRound
  lastDraw: LastRound = {} as LastRound
  ngOnInit(): void {
    timer(0,10000).subscribe(x => this.getLastDraw());
    timer(0,5000).subscribe(x => this.getCurrentDraw());
  }
  getCurrentDraw() {
    this.drawService.currentRound().subscribe(x => this.currentDraw = x)
  }
  getLastDraw() {
    this.drawService.lastRound().subscribe(x => this.lastDraw = x)
  }
}
