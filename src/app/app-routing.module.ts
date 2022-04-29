import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { RankingComponent } from './shared/ranking/ranking.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { TipComponent } from './shared/tip/tip.component';
import { WinningsComponent } from './shared/winnings/winnings.component';


const routes: Routes = [
  { path: 'tip', component: TipComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'winnings', component: WinningsComponent },
  { path: 'ranking', component: RankingComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }