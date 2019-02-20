import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
    base = environment.servidor;
    constructor(private http: HttpClient) { }
    index() {
        return this.http.get(this.base + 'tipos');
    }
    listar() {
        return this.http.get(this.base + 'listar-tipos');
    }
    show(tipo_id) {
        return this.http.get(this.base + 'tipos/' + tipo_id);
    }
    store(request) {
        return this.http.post(this.base + 'tipos', request);
    }
    update(tipo_id, request) {
        return this.http.put(this.base + 'tipos/' + tipo_id, request);
    }
    destroy(tipo_id) {
        return this.http.delete(this.base + 'tipos/' + tipo_id);
    }
    go(url: string) {
        return this.http.get(url);
    }
    buscar(valor: string) {
        return this.http.get(this.base + 'buscar-tipos/' + valor);
    }
}
