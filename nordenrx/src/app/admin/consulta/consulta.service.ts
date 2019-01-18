import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  base = environment.servidor;
  constructor(private http: HttpClient) { }

  store(request) {
    return this.http.post(this.base + 'consultas', request);
  }
}
