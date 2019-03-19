import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
    base = environment.servidor;

    constructor(private http: HttpClient) {
    }

    index() {
        return this.http.get(this.base + 'mensajes');
    }

    buscar(valor: string) {
        return this.http.get(this.base + 'buscar-mensajes/' + valor);
    }

    destroy(id) {
        return this.http.delete(`${this.base}mensajes/${id}`);
    }

    pagination(url: string) {
        return this.http.get(url);
    }
}