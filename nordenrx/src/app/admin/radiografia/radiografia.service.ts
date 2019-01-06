import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RadiografiaService {

  base = environment.base;
  constructor(private http: HttpClient) { }

  noAsignadas() {
    return this.http.get(this.base + 'no-asignadas');
  }
}