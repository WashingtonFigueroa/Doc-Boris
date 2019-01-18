import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RadiografiaService {

  base = environment.servidor;
  constructor(private http: HttpClient) { }

  noAsignadas() {
    return this.http.get(this.base + 'radiografias-no-asignadas');
  }
}
