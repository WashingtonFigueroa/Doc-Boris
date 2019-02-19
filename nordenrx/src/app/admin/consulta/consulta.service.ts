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
  go(url: string) {
      return this.http.get(url);
  }
  buscar(valor: string) {
      return this.http.get(this.base + 'buscar-consultas/' + valor);
  }
  store(request) {
    return this.http.post(this.base + 'consultas', request);
  }
  sri(tipo_documento: string, documento: string) {
    return this.http.get(`${this.base}sri/${tipo_documento}/${documento}`);
  }
}
