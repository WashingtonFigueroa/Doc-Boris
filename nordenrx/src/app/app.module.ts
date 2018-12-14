import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ContactosComponent } from './components/contactos/contactos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NosotrosComponent,
    ConsultasComponent,
    ContactosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
