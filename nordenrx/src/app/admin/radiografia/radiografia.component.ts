import { Component, OnInit } from '@angular/core';
import {RadiografiaService} from './radiografia.service';
import { environment } from '../../../environments/environment.prod';
import {ClienteService} from '../cliente/cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsultaService} from '../consulta/consulta.service';

@Component({
  selector: 'app-radiografia',
  templateUrl: './radiografia.component.html',
  styleUrls: ['./radiografia.component.css']
})
export class RadiografiaComponent implements OnInit {

  radiografias: any = [];
  clientes: any = [];
  imagen: any = null;
  asociado = false;
  img = environment.servidor + 'radiografia/';
  consultaGroup: FormGroup;

  constructor(private radiografiaService: RadiografiaService,
              private consultaService: ConsultaService,
              private fb: FormBuilder,
              private clienteService: ClienteService) {
    this.load();
    this.createForm();
  }

  ngOnInit() {
  }

  resetValues() {
    this.radiografias = [];
    this.clientes = [];
    this.imagen = null;
    this.asociado = false;
  }

  load() {
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

  createForm() {
    this.consultaGroup = this.fb.group({
      'radiografia_id' : [0, [Validators.required]],
      'cliente_id' : [0, [Validators.required]],
      'numero_factura' : ['', [Validators.required]],
      'imagen' : ['', [Validators.required]]
    });
  }

  save() {
    this.consultaGroup.patchValue({
      'radiografia_id' : +this.imagen.radiografia_id,
      'cliente_id' : +this.consultaGroup.value.cliente_id,
      'imagen' : this.imagen.archivo
    });
    if (confirm(`¿Esta seguro que desea registrar la consulta con número de factura: ${this.consultaGroup.value.numero_factura}?`)) {
      this.consultaService.store(this.consultaGroup.value)
        .subscribe((res: any) => {
          this.resetValues();
          this.load();
          this.consultaGroup.reset();
          console.log(res);
        });
    }
  }
}
