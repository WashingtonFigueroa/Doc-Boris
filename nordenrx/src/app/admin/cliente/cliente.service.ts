import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  base = environment.servidor;
  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(this.base + 'clientes');
  }
  listar() {
    return this.http.get(this.base + 'listar-clientes');
  }
  show(cliente_id) {
    return this.http.get(this.base + 'clientes/' + cliente_id);
  }
  store(request) {
    return this.http.post(this.base + 'clientes', request);
  }
  update(cliente_id, request) {
    return this.http.put(this.base + 'clientes/' + cliente_id, request);
  }
  destroy(cliente_id) {
    return this.http.delete(this.base + 'clientes/' + cliente_id);
  }
  go(url: string) {
    return this.http.get(url);
  }
  buscar(valor: string) {
    return this.http.get(this.base + 'buscar-clientes/' + valor);
  }

  consultaCedula(cedula) {
      const request = "consulta_cedula=consulta_cedula&txt_ruc="+cedula;
      return this.http.post('http://coatl.vadowservice.com/data/clientes/app.php', request, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
  }

}
