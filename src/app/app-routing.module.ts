import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { StonksComponent } from './shared/stonks/stonks.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'stonks/:name', component: StonksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }