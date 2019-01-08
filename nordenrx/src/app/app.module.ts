import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas
import {app_routing} from './app.routes';
// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { LoginComponent } from './components/login/login.component';
import {LoginService} from './components/login/login.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '../../node_modules/@angular/common/http';
import {AdminRoutingModule} from './admin/admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import {AdminModule} from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NosotrosComponent,
    ConsultasComponent,
    ContactosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
      CommonModule,
      HttpClientModule,
      AdminModule,
      ReactiveFormsModule,
      FormsModule,
      ToastrModule.forRoot()
  ],
  providers: [
      LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
