import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrivilegioService {

    base = environment.servidor;
    constructor(private http: HttpClient) { }

    store(req: any) {
        return this.http.post(`${this.base}privilegios`, req);
    }
}
