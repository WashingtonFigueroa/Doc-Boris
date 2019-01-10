import { Component, OnInit } from '@angular/core';
import {RadiografiaService} from './radiografia.service';
import { environment } from '../../../environments/environment.prod';
import {ClienteService} from '../cliente/cliente.service';

@Component({
  selector: 'app-radiografia',
  templateUrl: './radiografia.component.html',
  styleUrls: ['./radiografia.component.css']
})
export class RadiografiaComponent implements OnInit {

  radiografias: any = [];
  clientes: any = [];
  img = environment.base + 'radiografia/';
  imagen: any = null;
  asociado = false;
  constructor(private radiografiaService: RadiografiaService,
              private clienteService: ClienteService) {
    this.radiografiaService.noAsignadas()
      .subscribe((res: any) => {
        res.forEach((radiografia: any) => {
          this.radiografias.push({
            'checked' : false,
            'data' : radiografia
          });
        });
      });

    this.clienteService.listar()
      .subscribe((res: any) => {
        this.clientes = res;
      });
  }

  ngOnInit() {
  }

  updateImagen(radiografia: any, index) {
    if (this.imagen === null) {
      if (radiografia.checked === false) {
        radiografia.checked = !radiografia.checked;
        this.imagen = radiografia.data;
      }
    } else {
      if (radiografia.checked === true) {
        radiografia.checked = !radiografia.checked;
        this.imagen = null;
      } else {
        alert('Solo puede seleccionar una radiografia');
        radiografia.checked = false;
      }
    }
  }

  asociarConsulta() {
    this.asociado = true;
  }
}
