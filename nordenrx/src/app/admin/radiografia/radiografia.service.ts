import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RadiografiaService {

  base = environment.servidor;
  constructor(private http: HttpClient) { }

  noAsignadas() {
    return this.http.get(this.base + 'radiografias-no-asignadas');
  }
  sri(cedula: string) {
    const url = 'https://declaraciones.sri.gob.ec/sri-registro-civil-servicio-internet/rest/DatosRegistroCivil/obtenerPorNumeroIdentificacion?numeroIdentificacion=';
    return this.http.get(url + cedula);
  }
}
