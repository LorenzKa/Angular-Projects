import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Employee {
  id: number,
  name: string,
  city: string,
  country: string
}
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private http: HttpClient) {}
  employees: Employee[] = [];

  ngOnInit(): void {
    this.http.get<Employee[]>('http://localhost:5000/api/Northwind/employees').subscribe(data => {
    this.employees = data
  });
  }

}
