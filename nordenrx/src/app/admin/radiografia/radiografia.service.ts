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
  tomografiasNoAsignadas() {
    return this.http.get(this.base + 'tomografias-no-asignadas');
  }
  tipoRadiografias() {
    return this.http.get(this.base + 'tipo-radiografias');
  }
  tipoTomografias() {
    return this.http.get(this.base + 'tipo-tomografias');
  }
  sri(documento: string) {
    return this.http.get(`${this.base}sri/${documento}`);
  }
}
