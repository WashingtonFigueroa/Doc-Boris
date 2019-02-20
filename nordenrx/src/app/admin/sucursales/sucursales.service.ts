import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
    base = environment.servidor;
    constructor(private http: HttpClient) { }
    index() {
        return this.http.get(this.base + 'sucursales');
    }
    listar() {
        return this.http.get(this.base + 'listar-sucursales');
    }
    show(sucursale_id) {
        return this.http.get(this.base + 'sucursales/' + sucursale_id);
    }
    store(request) {
        return this.http.post(this.base + 'sucursales', request);
    }
    update(sucursale_id, request) {
        return this.http.put(this.base + 'sucursales/' + sucursale_id, request);
    }
    destroy(sucursale_id) {
        return this.http.delete(this.base + 'sucursales/' + sucursale_id);
    }
    go(url: string) {
        return this.http.get(url);
    }
    buscar(valor: string) {
        return this.http.get(this.base + 'buscar-sucursales/' + valor);
    }
}
