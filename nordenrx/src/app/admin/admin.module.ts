import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RadiografiaComponent } from './radiografia/radiografia.component';
import {RadiografiaService} from './radiografia/radiografia.service';
import {HttpClientModule} from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteIndexComponent } from './cliente/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './cliente/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './cliente/cliente-edit/cliente-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClienteService} from './cliente/cliente.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [RadiografiaComponent, ClienteComponent, ClienteIndexComponent, ClienteCreateComponent, ClienteEditComponent],
  providers: [RadiografiaService, ClienteService]
})
export class AdminModule { }
