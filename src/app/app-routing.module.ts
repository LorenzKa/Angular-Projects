import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PageUnknownComponentComponent } from './page-unknown-component/page-unknown-component.component';

const routes: Routes = [
  
  {path: 'customers', component: CustomersComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'orders/:id', component: OrdersComponent},
  {path: 'orders/details/:id', component: OrderDetailsComponent},
  {path: '**', component: PageUnknownComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }