import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface IClass {
  id: number;
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() classes : IClass[] = [];
  @Output() classSelected = new EventEmitter<number>();
  constructor() { }
  ngOnInit(): void {
  }
  onClassSelected(classId: number) {
    this.classSelected.emit(classId);
  }
}
