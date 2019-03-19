import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
    base = environment.servidor;
    constructor(private http: HttpClient) { }
    store(request) {
        return this.http.post(this.base + 'mensajes', request);
    }
}
