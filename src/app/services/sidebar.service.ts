import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu=[];
  cargarMenu(){

    console.log('SIDEBAR SERVICES cargo el menu del local storage')
    this.menu= JSON.parse(localStorage.getItem('menuHospitales')!) || [];
    console.log('y lo meto en una variable publica this.menu',this.menu);
  }

  // menu:any[]=[{
  //     titulo:'Dashboard',
  //     icono:'mdi mdi-gauge', 
  //     submenu:[
  //       {titulo:'Main',url:'/'},
  //       {titulo:'ProgressBar',url:'progress'},
  //       {titulo:'Grafica',url:'grafica1'},
  //       {titulo:'Promesa',url:'promesa'},
  //       {titulo:'Rxjs',url:'rxjs'}
  //     ]
  //   },
  //   {
  //     titulo:'Mantenimientos',
  //     icono:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo:'Usuarios',url:'usuarios'},
  //       {titulo:'Hospitales',url:'hospitales'},
  //       {titulo:'Médicos',url:'medicos'},

  //     ]
  //   },
  // ]
  constructor() { }
}
