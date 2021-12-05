import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
interface Order {
  id: number,
  orderDateMillis: number,
  requiredDateMillis: number,
  shippedDateMillis: number,
  nrOrderDetails: number
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }
  orders: Order[] = [];
  id : string = "";
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x => {this.id = x.get('id')!
    this.http.get<Order[]>('http://localhost:5000/api/Northwind/Customers/' + this.id).subscribe(data => this.orders = data, error => {
    this.http.get<Order[]>('http://localhost:5000/api/Northwind/Employees/' + this.id).subscribe(data => this.orders = data);
    });
    });
  }



}
