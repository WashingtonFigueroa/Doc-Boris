import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClienteComponent} from './cliente.component';
import {NosotrosComponent} from './nosotros/nosotros.component';
import {ConsultasComponent} from './consultas/consultas.component';
import {ContactosComponent} from './contactos/contactos.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {path: 'nosotros', component: NosotrosComponent},
      {path: 'consultas', component: ConsultasComponent},
      {path: 'contactos', component: ContactosComponent},
      {path: 'login', component: LoginComponent},
      {
        path: '',
        redirectTo: 'nosotros',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
