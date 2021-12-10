import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeltaData } from 'src/Dto/DeltaData';
import { BackendServiceService } from './backend-service.service';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My Angular Demo';
  barChartDates: string[] = [];
  barChartData: ChartDataset[] = [];
  
  constructor(private backendService: BackendServiceService) {
    
  }
  ngOnInit(): void {
    this.createBarChart();
  }
  createBarChart(): void {
    let backendData: Observable<DeltaData[]>;
    backendData = this.backendService.getDeltaData();
    let barChartNumbers: number[] = [];
    backendData.subscribe(data => {
      data.forEach(element => {
        this.barChartDates.push(element.date);
        barChartNumbers.push(element.deaths);
      })
      this.barChartData = [{ data: barChartNumbers, label: 'Deaths' }];
    })
  }

}
