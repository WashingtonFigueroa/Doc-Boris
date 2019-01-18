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
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultaCreateComponent } from './consulta/consulta-create/consulta-create.component';
import { ConsultaEditComponent } from './consulta/consulta-edit/consulta-edit.component';
import { ConsultaIndexComponent } from './consulta/consulta-index/consulta-index.component';
import {ConsultaService} from './consulta/consulta.service';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [RadiografiaComponent, ClienteComponent, ClienteIndexComponent, ClienteCreateComponent, ClienteEditComponent, ConsultaComponent, ConsultaCreateComponent, ConsultaEditComponent, ConsultaIndexComponent, AdminComponent],
  providers: [RadiografiaService, ClienteService, ConsultaService]
})
export class AdminModule { }
