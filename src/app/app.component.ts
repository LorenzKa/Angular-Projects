import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core';
interface ICustomer {
  id: number;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Angular Demo';
  formCustomerId : string = ''
  formFirstname : string = ''
  formLastname : string = ''
  customers: ICustomer[] = [];
  customerId: number = 1
  constructor(private http: HttpClient) {}
  getAllCustomers():void {
    this.http.get<ICustomer[]>('http://localhost:8000/api/customers').subscribe(result => this.customers = result)
  }
  getCustomer():void{
    this.http.get<ICustomer>('http://localhost:8000/api/customers/'+this.customerId).subscribe(result => this.customers.push(result))
  }
  //TODO: Not Finished
  createCustomer():void{
    this.http.post('http://localhost:8000/api/customers', this.formFirstname)
  }
}
