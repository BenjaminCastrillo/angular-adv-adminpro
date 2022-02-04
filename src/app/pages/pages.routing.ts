import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [

  { path: 'dashboard', 
  component:PagesComponent,
  children:[
    {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
    {path:'progress',component:ProgressComponent ,data:{titulo:'Progress'}},
    {path:'grafica1',component:Grafica1Component,data:{titulo:'Grafica'}},
    {path:'account-settings',component:AccountSettingsComponent,data:{titulo:'Tema'}},
    {path:'promesa',component:PromesaComponent,data:{titulo:'Promesa'}},
    {path:'rxjs',component:RxjsComponent,data:{titulo:'rxjs'}},
    
  ]},

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
