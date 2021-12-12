import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeltaData } from 'src/app/models/DeltaData';
import { BackendServiceService } from '../../core/services/backend-service.service';
import { ChartDataset } from 'chart.js';
import { CasesFederalStates } from 'src/app/models/casesFederalStates';
@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {
  casesFederalStates: Observable<CasesFederalStates[]> | undefined;
  icuChartDates: string[] = [];
  icuChartData: ChartDataset[] = [];
  hospitalChartDates: string[] = [];
  hospitalChartData: ChartDataset[] = [];
  pieChartDates: string[] = [];
  pieChartData: ChartDataset[] = [];
  constructor(private backendService: BackendServiceService) {
  }

  ngOnInit(): void {
    this.casesFederalStates = this.getCasesForFederalStates();
    this.createIcuChart();
    this.createHospitalChart();
    this.createPieChart();
  }
  getCasesForFederalStates(): Observable<CasesFederalStates[]> {
    return this.backendService.getCasesForFederalStates(1);
  }
  createIcuChart(): void {
    let icuChartNumbers: number[] = [];
    this.casesFederalStates?.subscribe(data => {
      data.forEach(element => {
        this.icuChartDates.push(element.date);
        icuChartNumbers.push(element.icuCount);
      });
      this.icuChartData = [{ data: icuChartNumbers, label: 'Intensive Care Unit Burgenland' }];
    })
  }
  createHospitalChart(): void {
    let hospitalChartNumbers: number[] = [];
    this.casesFederalStates?.subscribe(data => {
      console.log(data);
      data = data.reverse();
      for (let index = 0; index < 10; index++) {
        this.hospitalChartDates.push(data[index].date);
        hospitalChartNumbers.push(data[index].hospitalCount);
      }
    });
    this.hospitalChartData = [{ data: hospitalChartNumbers, label: 'Hospital Burgenland Last 10 Days' }];
  }
  createPieChart(): void {
    this.casesFederalStates?.subscribe(data => {
      data.reverse();
      this.pieChartDates = ["Hospital", "ICU"]
      this.pieChartData = [{ data: [data[0].hospitalCount, data[0].icuCount], label: 'Hospital and ICU Burgenland' }];
    });
    
  }

}
