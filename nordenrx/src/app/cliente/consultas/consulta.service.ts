import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "../../../../node_modules/@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

    base = environment.servidor;
    constructor(private http: HttpClient) { }

    index() {
        return this.http.get(this.base + 'consultas');
    }

}
