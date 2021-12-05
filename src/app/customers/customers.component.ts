
import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Customer{
  id: string,
  companyName: string,
  contactName: string,
  country: string,
  city: string
} 
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})

export class CustomersComponent implements OnInit {
  customers : Customer[] = [];
  displayedColumns: string [] = ['id', 'companyName', 'contactName', 'country', 'city', 'button'];

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.http.get<Customer[]>('http://localhost:5000/api/Northwind/Customers').subscribe(data => {
    this.customers = data
  });
  }

}
