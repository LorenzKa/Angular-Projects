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
interface IWinnerResponse{
  matchId: number,
  winner: number
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
  buttonValue = ""
  ngOnInit(): void{
    this.getMatchesFromCurrentRound();
  }
  constructor(private http: HttpClient) {}
  getMatchesFromCurrentRound() : void{
    this.http.get<IMatchList>(this.baseurl+"Match/CurrentRound").subscribe(result => this.matchList = result)
  }
  setWinner(playerId : number, matchId: number): void{
    console.log("playerid:"+playerId+" matchid:"+matchId)
    
    this.http.post<IWinnerResponse>(this.baseurl+"Match", { playerid: playerId, matchid: matchId } ).subscribe(result => {
      const winnerResponse : IWinnerResponse = result
      console.log(winnerResponse)
      console.log(this.matchList.matches.find(x => x.id == winnerResponse.matchId))
      this.matchList.matches.find(x => x.id == winnerResponse.matchId)!.winner=winnerResponse.winner;
      
    })
  }
  startTournament(){
    this.http.delete(this.baseurl+"Match").subscribe(result => console.log(result))
    this.http.get<IMatchList>(this.baseurl+"Match/GenerateRound").subscribe(x => this.matchList = x)
  }
  nextRound(){
    this.http.get<IMatchList>(this.baseurl+"Match/GenerateRound").subscribe(x => this.matchList = x)
  }
  isWinner(playerNumber: number, matchId: number) : string{
    if(this.matchList.matches.find(x => x.id == matchId)?.winner == playerNumber){
      return 'primary'
    }
    else{
      return 'warn'
    }
  }
  hasMatches(): string{
    if(this.matchList.matches.length > 1){
      return 'accent'
    }
    else{
      return 'primary'
    }
  }
  canContinue(): boolean{
    if(this.matchList.matches.filter(x => x.winner == null).length == 0 && this.matchList != undefined){
      return true;
    }
    else{
      return false;
    }
  }
}
