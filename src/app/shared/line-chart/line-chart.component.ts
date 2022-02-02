import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StockHubService } from 'src/app/core/stock-hub.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(private hubService: StockHubService) {}
  ngOnInit(): void {
    this.chart?.update();
    console.log(this.lineChartData);
    this.hubService.onStockUpdate().subscribe(x => {
      console.log(x)
      this.lineChartData.labels!.push(new Date().toISOString().substr(11, 8));
      x.forEach(share => {
        this.lineChartData.datasets.find(y => y.label == share.name)?.data.push(share.val);
      })
      this.chart?.update();
    })
  }
  lineChartOptions: ChartConfiguration['options'] = {responsive: true,
    maintainAspectRatio: false,
  }

}
