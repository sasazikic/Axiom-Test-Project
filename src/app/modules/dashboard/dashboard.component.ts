import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  tableData: any = [];
  cities = ['New York', 'London', 'Paris', 'Tokyo', 'Berlin', 'Sydney', 'Dubai', 'Moscow', 'Singapore', 'Los Angeles']

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    const payload = {
      locations: this.cities.map(city => ({ q: city }))
    };

    this.dashboardService.fetchData(payload).subscribe({
      next: (data: any) => {
        console.log(data)
        this.tableData.push(data.bulk)
        console.log(this.tableData)

      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  onClick(event: Event, name: string) {
    console.log(name)
  }


}
