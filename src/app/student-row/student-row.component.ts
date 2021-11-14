import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotifierService } from '../notifier.service';
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
@Component({
  selector: '[app-student-row]',
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.scss']
})
export class StudentRowComponent implements OnInit {
  @Input() student: IStudent = {} as IStudent;
  @Output() changeStudentClass = new EventEmitter<IStudent>();
  constructor(private notifier: NotifierService) { }
  onClassSelected(classId: number) {
    this.student.clazzId = classId;
    this.changeStudentClass.emit( this.student as IStudent);
    this.notifier.notify(`${this.student.name} --> ${this.student.availableClazzes.find(x => x.id == this.student.clazzId)?.name}`);
  }
  getAgeString(studentAge: string): string {
      return studentAge.substring(0,1) + "0+";
  }
  changeRegistered() : void{
    if(this.student.registered){
      this.student.registered = false;
    }else{
      this.student.registered = true;
    }
    this.changeStudentClass.emit(this.student as IStudent);
  }
  changeAge() : void{
    this.changeStudentClass.emit(this.student as IStudent);
  }

  ngOnInit(): void {
  }

}
