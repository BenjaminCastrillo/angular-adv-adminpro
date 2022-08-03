import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

 
  public progreso1:number=25;
  public progreso2:number=35;


  public prueba=[
    {a:1,b:false,c:true},
    {a:2,b:false,c:false},
    {a:3,b:false,c:false},
    {a:4,b:false,c:false},
    {a:5,b:true,c:false},
  ]


  constructor() { }

  ngOnInit(): void {
  }
  
  get getProgreso1(){
    return `${this.progreso1}%`;
  }

  get getProgreso2(){
    return `${this.progreso2}%`;
  }

  

  selectMark($event:any,i:number){

    console.log('SE LANZA EL EVENTO',$event);
    console.log($event.target.value);
    console.log($event.target.checked);
    console.log('indice',i);
    console.log(this.prueba);
       return;
   }
   

}
