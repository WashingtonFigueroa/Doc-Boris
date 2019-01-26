import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  base = environment.servidor;
  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(this.base + 'consultas');
  }

  store(request) {
    return this.http.post(this.base + 'consultas', request);
  }

  sri(cedula: string) {
    const url = 'https://declaraciones.sri.gob.ec/sri-registro-civil-servicio-internet/rest/DatosRegistroCivil/obtenerPorNumeroIdentificacion?numeroIdentificacion=';
    return this.http.get(url + cedula);
  }
}
