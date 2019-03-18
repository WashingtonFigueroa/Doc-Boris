import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RadiografiaComponent} from './radiografia/radiografia.component';
import {ClienteComponent} from './cliente/cliente.component';
import {ClienteIndexComponent} from './cliente/cliente-index/cliente-index.component';
import {ClienteCreateComponent} from './cliente/cliente-create/cliente-create.component';
import {ClienteEditComponent} from './cliente/cliente-edit/cliente-edit.component';
import {AdminComponent} from './admin.component';
import {ConsultaIndexComponent} from './consulta/consulta-index/consulta-index.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {ReporteComponent} from './reporte/reporte.component';
import {ReporteIndexComponent} from './reporte/reporte-index/reporte-index.component';
import {ReporteCreateComponent} from './reporte/reporte-create/reporte-create.component';
import {ReporteUpdateComponent} from './reporte/reporte-update/reporte-update.component';
import {ProfesionalComponent} from './profesional/profesional.component';
import {ProfesionalIndexComponent} from './profesional/profesional-index/profesional-index.component';
import {ProfesionalCreateComponent} from './profesional/profesional-create/profesional-create.component';
import {ProfesionalUpdateComponent} from './profesional/profesional-update/profesional-update.component';
import {TipoComponent} from './tipo/tipo.component';
import {TipoIndexComponent} from './tipo/tipo-index/tipo-index.component';
import {TipoCreateComponent} from './tipo/tipo-create/tipo-create.component';
import {TipoUpdateComponent} from './tipo/tipo-update/tipo-update.component';
import {SucursalesComponent} from './sucursales/sucursales.component';
import {SucursalesIndexComponent} from './sucursales/sucursales-index/sucursales-index.component';
import {SucursalesCreateComponent} from './sucursales/sucursales-create/sucursales-create.component';
import {SucursalesUpdateComponent} from './sucursales/sucursales-update/sucursales-update.component';
import {MensajesComponent} from './mensajes/mensajes.component';
import {MensajesIndexComponent} from './mensajes/mensajes-index/mensajes-index.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'radiografias',
        component: RadiografiaComponent
      },
      {
        path: 'consultas',
        component: ConsultaComponent,
        children: [
          {
            path: 'listar',
            component: ConsultaIndexComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'clientes',
        component: ClienteComponent,
        children: [
          {
            path: 'listar',
            component: ClienteIndexComponent
          },
          {
            path: 'crear',
            component: ClienteCreateComponent
          },
          {
            path: 'editar/:cliente_id',
            component: ClienteEditComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
        {
            path: 'reportes',
            component: ReporteComponent,
            children: [
                {
                    path: 'listar',
                    component: ReporteIndexComponent
                },
                {
                    path: 'crear',
                    component: ReporteCreateComponent
                },
                {
                    path: 'editar/:cliente_id',
                    component: ReporteUpdateComponent
                },
                {
                    path: '',
                    redirectTo: 'listar',
                    pathMatch: 'full'
                }
            ]
        },
        {
            path: 'mensajes',
            component: MensajesComponent,
            children: [
                {
                    path: 'listar',
                    component: MensajesIndexComponent
                },
                {
                    path: '',
                    redirectTo: 'listar',
                    pathMatch: 'full'
                }
            ]
        },
        {
            path: 'profesionales',
            component: ProfesionalComponent,
            children: [
                {
                    path: 'listar',
                    component: ProfesionalIndexComponent
                },
                {
                    path: 'crear',
                    component: ProfesionalCreateComponent
                },
                {
                    path: 'editar/:profesional_id',
                    component: ProfesionalUpdateComponent
                },
                {
                    path: '',
                    redirectTo: 'listar',
                    pathMatch: 'full'
                }
            ]
        },
        {
            path: 'tipos',
            component: TipoComponent,
            children: [
                {
                    path: 'listar',
                    component: TipoIndexComponent
                },
                {
                    path: 'crear',
                    component: TipoCreateComponent
                },
                {
                    path: 'editar/:tipo_id',
                    component: TipoUpdateComponent
                },
                {
                    path: '',
                    redirectTo: 'listar',
                    pathMatch: 'full'
                }
            ]
        },
        {
            path: 'sucursales',
            component: SucursalesComponent,
            children: [
                {
                    path: 'listar',
                    component: SucursalesIndexComponent
                },
                {
                    path: 'crear',
                    component: SucursalesCreateComponent
                },
                {
                    path: 'editar/:sucursal_id',
                    component: SucursalesUpdateComponent
                },
                {
                    path: '',
                    redirectTo: 'listar',
                    pathMatch: 'full'
                }
            ]
        },
      {
        path: '',
        redirectTo: 'radiografias',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
