import { AfterViewInit, Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnChanges{
  @Input() chartData: any = [];
  @Input() chartLabels: any = [];
  chart: any


  ngOnInit(): void {
    console.log(this.chartData)
    console.log(this.chart)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData.length > 0) {
      this.initializeChart();
    }
  }

  initializeChart(): void {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.chartLabels,
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      series: [
        {
          name: 'Max Temperature Per Day',
          data: this.chartData
        } as any
      ]
    });
  }


}
