import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    //Doughnut
    public doughnutChartLabels:string[] = ['Rejected', 'Approved', 'Pending'];
    public doughnutChartLabels1:string[] = ['Not Picked', 'Picked'];
    public doughnutChartType:string = 'doughnut';
    doughnutChartOptions = {
          responsive: true
      };
    doughnutChartColor:any = [
      {
          backgroundColor: ['rgba(245,89,61,0.8)','rgba(107,208,152,0.8)']
      }
    ];
    public doughnutChartData:any = [2, 5,4] ;
    public doughnutChartData1:any = [6, 15] ;

    constructor() { }

    ngOnInit() {
    }

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

}
