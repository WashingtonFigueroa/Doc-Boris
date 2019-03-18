import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "../../../../node_modules/@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

    base = environment.servidor;
    constructor(private http: HttpClient) { }

    index() {
        return this.http.get(this.base + 'profesionales');
    }
    buscar(valor: string) {
        return this.http.get(this.base + 'buscar-profesionales/' + valor);
    }
    listar() {
        return this.http.get(this.base + 'listar-profesionales');
    }
    show(profesional_id) {
        return this.http.get(this.base + 'profesionales/' + profesional_id);
    }
    store(request) {
        return this.http.post(this.base + 'profesionales', request);
    }
    update(profesional_id, request) {
        return this.http.put(this.base + 'profesionales/' + profesional_id, request);
    }
    destroy(profesional_id) {
        return this.http.delete(this.base + 'profesionales/' + profesional_id);
    }
    go(url: string) {
        return this.http.get(url);
    }
    sri(documento: string) {
        return this.http.get(`${this.base}sri/${documento}`);
    }
}
