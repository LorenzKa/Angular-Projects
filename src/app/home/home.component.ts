import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../values.service';
import { DummyDataDto } from '../DummyDataDto';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dummyData: Observable<DummyDataDto> = this.valuesService.getDummyData();
  constructor(private valuesService: ValuesService) { }

  ngOnInit(): void {
    console.log("want dummy Data")
    this.dummyData = this.valuesService.getDummyData();
  }

}
