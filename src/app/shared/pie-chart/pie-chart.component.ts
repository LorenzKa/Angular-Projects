import { AfterViewInit, Component, } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Input } from '@angular/core';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  @Input() labels!: string[];
  @Input() data!: ChartDataset[];
  @Input() label!: string;
  

}
