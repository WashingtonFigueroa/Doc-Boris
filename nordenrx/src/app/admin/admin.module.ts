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
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteIndexComponent } from './reporte/reporte-index/reporte-index.component';
import { ReporteUpdateComponent } from './reporte/reporte-update/reporte-update.component';
import { ReporteCreateComponent } from './reporte/reporte-create/reporte-create.component';
import {ReporteService} from "./reporte/reporte.service";
import { ProfesionalComponent } from './profesional/profesional.component';
import { ProfesionalIndexComponent } from './profesional/profesional-index/profesional-index.component';
import { ProfesionalUpdateComponent } from './profesional/profesional-update/profesional-update.component';
import { ProfesionalCreateComponent } from './profesional/profesional-create/profesional-create.component';
import {ProfesionalService} from "./profesional/profesional.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RadiografiaComponent, ClienteComponent, ClienteIndexComponent, ClienteCreateComponent, ClienteEditComponent, ConsultaComponent, ConsultaCreateComponent, ConsultaEditComponent, ConsultaIndexComponent, AdminComponent, AdminHeaderComponent, ReporteComponent, ReporteIndexComponent, ReporteUpdateComponent, ReporteCreateComponent, ProfesionalComponent, ProfesionalIndexComponent, ProfesionalUpdateComponent, ProfesionalCreateComponent],
  providers: [RadiografiaService, ClienteService, ConsultaService, ReporteService, ProfesionalService]
})
export class AdminModule { }
