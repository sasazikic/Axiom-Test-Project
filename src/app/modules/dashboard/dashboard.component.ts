import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  isLoading = false;
  isChartEmpty = true;
  tableData: any = [];
  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Berlin', 'Sydney', 'Dubai', 'Moscow', 'Singapore', 'Los Angeles']
  chartData: any = [];
  chartLabels: any = [];

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    const payload = {
      locations: this.cities.map(city => ({ q: city }))
    };

    this.dashboardService.fetchCities(payload).subscribe({
      next: (data: any) => {
        this.tableData.push(data.bulk)

      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  onCityClick(event: Event, name: string) {
    this.isChartEmpty = true;
    this.isLoading = true;

    this.dashboardService.getCity(name).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.isChartEmpty = false;
        this.chartData = [];
        data.forecast.forecastday.forEach((element: any) => {
          this.chartData.push(element.day.maxtemp_c)
          this.chartLabels.push(element.date)
        });
        setTimeout(() => this.scrollToChart(), 0);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  scrollToChart(): void {
    if (this.chartContainer) {
      this.chartContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
