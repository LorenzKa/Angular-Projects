import { AfterViewInit, Component, } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Input } from '@angular/core';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  @Input() labels!: string[];
  @Input() data!: ChartDataset[];
  @Input() label!: string;

}
