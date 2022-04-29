import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/core/services/ranking.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  constructor(private rankingService: RankingService) { }
  users: User[] = []
  ngOnInit(): void {
    this.rankingService.getRanking().subscribe(x => this.users = x)
  }
  getColor(id: number): string {
    if (id == 0) return "#FFD700"
    if (id == 1) return "#C0C0C0"
    if (id == 2) return "#CD7F32"
    return "FFF"


  }

}
