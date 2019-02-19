import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "../../../../node_modules/@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
    base = environment.servidor;
    constructor(private http: HttpClient) { }

    sumradiografias() {
        return this.http.get(this.base + 'sumradiografias');
    }
    sumrconsultas() {
        return this.http.get(this.base + 'sumrconsultas');
    }
    diferencia() {
        return this.http.get(this.base + 'diferencia');
    }
    valorconsulta() {
        return this.http.get(this.base + 'valor');
    }
}
