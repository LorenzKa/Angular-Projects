import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
interface OrderDetail {
  orderId: number,
  unitPrice: number,
  quantity: number,
  productName: string,
}
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }
  orderDetails: OrderDetail[] = [];
  id = 0;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x => {this.id = +x.get('id')!
    this.http.get<OrderDetail[]>('http://localhost:5000/api/Northwind/OrderDetails/' + this.id).subscribe(data => this.orderDetails = data)
  });
  }
}
