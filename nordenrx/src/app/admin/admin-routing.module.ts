import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RadiografiaComponent} from './radiografia/radiografia.component';

const routes: Routes = [
  {
    path: 'radiografias',
    component: RadiografiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
