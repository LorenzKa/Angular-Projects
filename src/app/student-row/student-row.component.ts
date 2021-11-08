import { Component, Input, OnInit } from '@angular/core';

interface IStudent {
  id: number;
  gender: string,
  name: string,
  email: string,
  country: string,
  age: number,
  registered: number,
  clazzId: number
}
@Component({
  selector: 'app-student-row',
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.scss']
})
export class StudentRowComponent implements OnInit {
  @Input() student: IStudent = {} as IStudent;
  constructor() { }

  ngOnInit(): void {
  }

}
