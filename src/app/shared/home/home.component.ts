import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeltaData } from 'src/app/models/DeltaData';
import { BackendServiceService } from '../../core/services/backend-service.service';
import { ChartDataset } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  deathsChartDates: string[] = [];
  deathsChartData: ChartDataset[] = [];
  activeChartDates: string[] = [];
  activeChartData: ChartDataset[] = [];
  pieChartDates: string[] = [];
  pieChartData: ChartDataset[] = [];
  deltaData: Observable<DeltaData[]> | undefined;
  constructor(private backendService: BackendServiceService) {
  }
  ngOnInit(): void {
    this.deltaData = this.getDeltaData();
    this.createDeathsChart();
    this.createActiveChart();
    this.createPieChart();
  }
  getDeltaData(): Observable<DeltaData[]> {
    return this.backendService.getDeltaData();
  }
  createDeathsChart(): void {
    let barChartNumbers: number[] = [];
    this.deltaData?.subscribe(data => {
      data.forEach(element => {
        this.deathsChartDates.push(element.date);
        barChartNumbers.push(element.deaths);
      })
      this.deathsChartData = [{ data: barChartNumbers, label: 'Deaths' }];
    })
  }
  createActiveChart(): void {
    let barChartNumbers: number[] = [];
    this.deltaData?.subscribe(data => {
      data.forEach(element => {
        this.activeChartDates.push(element.date);
        barChartNumbers.push(element.active);
      })
      this.activeChartData = [{ data: barChartNumbers, label: 'Active Cases' }];
    })
  }
  createPieChart(): void {
    let sumDeaths: number = 0;
    let sumHealed: number = 0;
    this.deltaData?.subscribe(data => {
      data.forEach(element => {
        sumDeaths += element.deaths;
        sumHealed += element.healed;
      })
      this.pieChartDates = ['Deaths', 'Healed'];
      this.pieChartData = [{ data: [sumDeaths, sumHealed], label: 'Deaths and Healed' }];
    })
  }
}
