import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard} from '../guards/admin.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [

  { path: 'dashboard', 
  component:PagesComponent,
  canActivate:[AuthGuard],
  children:[
    {path:'',component:DashboardComponent,data:{titulo:'Dashboard'}},
    {path:'progress',component:ProgressComponent ,data:{titulo:'Progress'}},
    {path:'grafica1',component:Grafica1Component,data:{titulo:'Grafica'}},
    {path:'buscar/:termino',component:BusquedaComponent,data:{titulo:'Busqueda'}},
    {path:'account-settings',component:AccountSettingsComponent,data:{titulo:'Tema'}},
    {path:'promesa',component:PromesaComponent,data:{titulo:'Promesa'}},
    {path:'rxjs',component:RxjsComponent,data:{titulo:'rxjs'}},
    {path:'perfil',component:PerfilComponent,data:{titulo:'Perfil de usuario'}},
    //Mantenimientos
    {path:'hospitales',component:HospitalesComponent,data:{titulo:'Hospitales'}},
    {path:'medicos',component:MedicosComponent,data:{titulo:'Medicos'}},
    {path:'medicos/medico/:id',component:MedicoComponent,data:{titulo:'Medico'}},
    // Rutas de admin la pasamos por el guard admin
    {path:'usuarios',canActivate:[AdminGuard],component:UsuariosComponent,data:{titulo:'Usuarios'}},
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
