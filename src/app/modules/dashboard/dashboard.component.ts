import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  isWidgetLoading = true;
  isChartLoading = false;
  isTableLoading = true;
  tableData: any = [];
  cities = ['New York', 'London', 'Paris', 'Tokyyoo', 'Berlin', 'Sydney', 'Dubai', 'Moscow', 'Singapore', 'Los Angeles']
  metricInitial = this.formService.prepopulatedFormData?.metricPreference || ["name", "humidity", "temp_c", "text"];
  // metricInitial = ["name", "humidity", "temp_c", "text"]
  chartData: any = [];
  chartLabels: any = [];
  widgetData: any = {};
  chartType = 'line';
  layoutType = 'card'


  constructor(private dashboardService: DashboardService, private formService: FormService) {

  }

  ngOnInit(): void {
    console.log(this.metricInitial)
    let isFormPopulated = this.formService.prepopulatedFormData ? true : false;
    if(isFormPopulated) {
      this.chartType = this.formService.prepopulatedFormData.chartOption
      this.layoutType = this.formService.prepopulatedFormData.layoutOption
    }

    const payload = {
      locations: (isFormPopulated ? this.formService.prepopulatedFormData.cities : this.cities).map(city => ({ q: city }))
    };

    this.dashboardService.fetchCities(payload).subscribe({
      next: (data: any) => {
        this.isWidgetLoading = false;
        this.isTableLoading = false;

        let flattenedArray = data.bulk.map((element: any) => this.flattenObject(element));
        this.tableData = flattenedArray

        this.extractWidgetData(data);
        console.log(this.tableData)

      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  onCityClick(event: Event, name: string) {
    this.isChartLoading = true;

    this.dashboardService.getCity(name).subscribe({
      next: (data: any) => {
        this.isChartLoading = false;
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

  extractWidgetData(apiData: any) {
    // Work only with valid items (if some city doesn't return any value)
    const validItems = apiData.bulk.filter((item: any) => item.query?.current);

    const temperatures = validItems.map((item: any) => item.query.current.temp_c);
    const humidities = validItems.map((item: any) => item.query.current.humidity);


    // Case when none of the cities returned values
    if (temperatures.length === 0 || humidities.length === 0) {
      console.warn('No valid data available for temperatures or humidities.');
      this.widgetData.maxTemp = "Invalid data";
      this.widgetData.minTemp = "Invalid data";
      this.widgetData.avgHumidity = "Invalid data";
      return;
    }

    this.widgetData.maxTemp = Math.max(...temperatures)
    this.widgetData.minTemp = Math.min(...temperatures)
    const totalHumidity = humidities.reduce((sum: number, humidity: number) => sum + humidity, 0);
    const avgHumidity = totalHumidity / humidities.length;
    this.widgetData.avgHumidity = +avgHumidity.toFixed(1);
  }

  flattenObject(obj: any) {

    const flattened: any = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenObject(value));
      } else {
        flattened[key] = value;
      }
    });

    return flattened;
  }
}
