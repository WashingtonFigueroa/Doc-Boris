import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RadiografiaComponent} from './radiografia/radiografia.component';
import {ClienteComponent} from './cliente/cliente.component';
import {ClienteIndexComponent} from './cliente/cliente-index/cliente-index.component';
import {ClienteCreateComponent} from './cliente/cliente-create/cliente-create.component';
import {ClienteEditComponent} from './cliente/cliente-edit/cliente-edit.component';
import {AdminComponent} from './admin.component';

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
