import { AfterViewInit, Component, } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Input } from '@angular/core';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  @Input() labels!: string[];
  @Input() data!: ChartDataset[];
  @Input() label!: string;
  

}
