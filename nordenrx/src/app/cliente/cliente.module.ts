import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import {ContactosComponent} from './contactos/contactos.component';
import {LoginComponent} from './login/login.component';
import {ConsultasComponent} from './consultas/consultas.component';
import {NosotrosComponent} from './nosotros/nosotros.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginService} from './login/login.service';
import {ClienteComponent} from './cliente.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ClienteRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContactosComponent,
    ConsultasComponent,
    NosotrosComponent,
    LoginComponent,
    ClienteComponent
  ],
  providers: [LoginService]
})
export class ClienteModule { }
