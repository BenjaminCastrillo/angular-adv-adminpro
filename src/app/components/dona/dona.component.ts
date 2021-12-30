import { Component, OnInit ,Input} from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

@Input() title:string ="Sin titulo";
// @Input('labels') doughnutChartLabels:string[] =['x','y','z'];
@Input('labels') doughnutChartLabels:string[] =['x','y','z'];
@Input('values') datos:number[] =[1,1,1];


 public datos1:number[]=[ 50, 5, 1 ];

   // Doughnut
 //  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  
 public doughnutChartData: ChartData<'doughnut'> = {
     labels: this.doughnutChartLabels,
     datasets: [
       { data: this.datos1,
         backgroundColor:['#9E120E','#FF5800','#FFB414'],
         hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
         hoverBorderColor:['#000000','#000000','#00000003']},
   
     ]
   };
   public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    console.log(this.doughnutChartLabels)
    console.log(this.datos)


  }

}
