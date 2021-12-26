import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import {FormsModule} from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    FormsModule,
    NgChartsModule,
    CommonModule

  ],
  exports: [
    IncrementadorComponent,
    DonaComponent
  ]
})
export class ComponentesModule { }
