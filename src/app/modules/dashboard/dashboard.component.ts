import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  tableData: any = [];

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    let city = 'London';
    this.dashboardService.fetchData(city).subscribe({
      next: (data: any) => {
        console.log(data);
        this.tableData.push(data)
        this.tableData.push(data)

      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }


}
