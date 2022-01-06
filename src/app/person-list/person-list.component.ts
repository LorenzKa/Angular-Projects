import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { PersonDto } from '../personDto';
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private backendService: BackendService, private notfierService: NotifierService) {}
  persons: PersonDto[] = [];
  ngOnInit(): void {
    this.notfierService.listen().subscribe(id => {
      console.log("gotnotified")
      this.getPersons();
    })
    this.getPersons();
  }
  getPersons(){
    this.backendService.getPersons().subscribe(persons => this.persons = persons);
  }

}
