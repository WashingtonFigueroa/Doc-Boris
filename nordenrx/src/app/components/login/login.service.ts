import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    baseServidor = environment.baseServidor;
  constructor(protected  http: HttpClient) { }
  login(credenciales){
    return this.http.post(this.baseServidor + 'login', credenciales);
  }
}
