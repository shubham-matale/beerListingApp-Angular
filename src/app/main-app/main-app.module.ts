import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { BeerListComponent } from './beer-list/beer-list.component';
import {SharedModule} from '../shared/shared.module';
import { MainAppComponent } from './main-app.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [BeerListComponent, MainAppComponent],
  exports: [
    MainAppComponent
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MainAppModule { }
