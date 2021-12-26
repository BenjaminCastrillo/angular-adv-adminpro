import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

 public labels1: string[] = [ 'Ventas enviadas', 'Ventas en almacen', 'Ordenes de ventas' ]
 public labels2: string[] = [ 'Compras recibidas', 'Stock actual', 'Ordenes de compras' ]
 public labels3: string[] = [ 'Personal dpto1', 'Personal dpto2', 'Personal dpto3' ]
 public labels4: string[] = [ 'lapiceros', 'Portaminas', 'Minas' ]
 
 public data1:number[] =[ 350, 450, 100 ]
 public data2:number[] =[ 100, 10, 300 ] 
 public data3:number[] =[ 1000, 500, 100 ] 
 public data4:number[] = [ 65, 55, 45 ]

 

  constructor() { }

  ngOnInit(): void {
  }

}
