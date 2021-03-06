import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
// import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

import { ComponentesModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesaComponent,
    RxjsComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
 //   AppRoutingModule,
    RouterModule,
    ComponentesModule,
    ReactiveFormsModule
  ],
  exports:[
   DashboardComponent,
   ProgressComponent,
  Grafica1Component,
    AccountSettingsComponent,
   PagesComponent,
   PromesaComponent
  ],
})
export class PagesModule { }
