import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatChipSelectionChange } from '@angular/material/chips';
interface IPLayer{
  id: number,
  name: string,
  gender: string
}
interface IMatch{
  id: number,
  player1: IPLayer,
  player2: IPLayer,
  winner: number
}
interface IMatchList{
  roundNumber: number,
  matches: IMatch[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  declare matchList: IMatchList
  roundNumber: number = 0;
  title = 'My Angular Demo';
  baseurl = "http://localhost:5000/api/"
  ngOnInit(): void{
    this.getMatchesWithoutWinner();
  }
  constructor(private http: HttpClient) {}
  getMatchesWithoutWinner() : void{
    this.http.get<IMatchList>("http://localhost:5000/api/Match/WihoutWinner").subscribe(result => this.matchList = result)
  }
}
