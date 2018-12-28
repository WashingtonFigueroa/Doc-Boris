import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RadiografiaComponent } from './radiografia/radiografia.component';
import {RadiografiaService} from './radiografia/radiografia.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  declarations: [RadiografiaComponent],
  providers: [RadiografiaService]
})
export class AdminModule { }
