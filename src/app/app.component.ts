import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IClass {
  id: number;
  name: string;
}
interface IStudent {
  id: number;
  gender: string,
  name: string,
  email: string,
  country: string,
  age: number,
  registered: boolean,
  clazzId: number,
  availableClazzes: IClass[]
}
interface IChangeClass{
  classId: number, studentId: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Angular Demo';
  classes : IClass[] = [];
  students: IStudent[] = [];
  selectedClass : number = 0;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<IClass[]>('http://localhost:5000/Class')
    .subscribe(data =>{ this.classes = data
    console.log(this.classes)
    });
  }
  changeStudent(receivedData: IStudent){
    this.http.put<IStudent>('http://localhost:5000/Student/SetStudent', receivedData).subscribe(data => {
      console.log(data)
      this.students = this.students.filter(x => x.id != receivedData.id)
      this.students.push(receivedData)

    })
  }
  classSelected(classId: number) {
    this.selectedClass = classId;
    this.http.get<IStudent[]>('http://localhost:5000/Class/' + classId).subscribe(data => {
      console.log(data)
      this.students = data;
      
    })
  }
}
