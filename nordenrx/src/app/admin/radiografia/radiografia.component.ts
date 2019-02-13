import { Component, OnInit } from '@angular/core';
import {RadiografiaService} from './radiografia.service';
import { environment } from '../../../environments/environment.prod';
import {ClienteService} from '../cliente/cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsultaService} from '../consulta/consulta.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-radiografia',
  templateUrl: './radiografia.component.html',
  styleUrls: ['./radiografia.component.css']
})
export class RadiografiaComponent implements OnInit {

  radiografias: any = [];
  clientes: any = [];
  cliente: any = {
    cliente_id : 0,
    razon_social : '',
    tipo_documento : '',
    documento : '',
    direccion : '',
    fecha_nacimiento : '',
    celular : '',
    genero : 'Hombre',
  };
  imagen: any = null;
  asociado = false;
  mostrar = false;

    img = environment.servidor + 'radiografia/';
  consultaGroup: FormGroup;

  constructor(private radiografiaService: RadiografiaService,
              private consultaService: ConsultaService,
              private fb: FormBuilder,
              private clienteService: ClienteService,
              private toastrService: ToastrService) {
    this.load();
    this.createForm();
  }

  ngOnInit() {
  }


  resetCliente() {
    this.cliente = {
      cliente_id : 0,
      razon_social : '',
      tipo_documento : '',
      documento : '',
      direccion : '',
      fecha_nacimiento : '',
      celular : '',
      genero : 'Hombre',
    };
    this.consultaGroup.patchValue({
      'cliente_id' : 0,
      'razon_social' : '',
      'direccion' : '',
      'fecha_nacimiento' : '',
      'celular' : '',
      'genero' : 'varon'
    });
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
  loadCliente() {
    this.clienteService.show(this.consultaGroup.value.cliente_id)
      .subscribe((res: any) => {
        this.cliente = res;
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
      'radiografia_id' : [0],
      'tipo_documento' : ['cedula'],
      'documento' : ['', [Validators.required]],
      'razon_social' : ['', [Validators.required]],
      'direccion' : [''],
      'fecha_nacimiento' : ['', [Validators.required]],
      'celular' : [''],
      'genero' : [''],
      'cliente_id' : [0],
      'numero_factura' : ['', [Validators.required]],
      'imagen' : [''],
      'valor' : ['', [Validators.required]]
    });
  }

  searchPerson() {
    this.mostrar =true;
    this.resetCliente();
    const documento = this.consultaGroup.value.documento;
    this.radiografiaService
        .sri(documento)
        .subscribe((res: any) => {
          this.mostrar = false;
          if (res.type === 'sri') {
                  this.consultaGroup.patchValue({
                      'razon_social' : res.data.data.nombreCompleto,
                      'direccion' : res.data.data.residencia,
                      'fecha_nacimiento' :new FormControl(res.data.data.fechaNacimiento),
                      'genero' : new FormControl(res.data.data.genero),

                  });
          } else {
            this.consultaGroup.patchValue({
              'cliente_id' : res.data.cliente_id,
              'razon_social' : res.data.razon_social,
              'tipo_documento' : res.data.tipo_documento,
              'documento' : res.data.documento,
              'direccion' : res.data.direccion,
                'fecha_nacimiento' :new FormControl(res.data.fechaNacimiento),
              'celular' : res.data.celular,
              'genero' : new FormControl(res.data.genero),
            });
            this.cliente.razon_social = res.data.razon_social;
            this.cliente.tipo_documento = res.data.tipo_documento;
            this.cliente.documento = res.data.documento;
            this.cliente.direccion = res.data.direccion;
            this.cliente.fecha_nacimiento = res.data.fecha_nacimiento;
            this.cliente.celular = res.data.celular;
            this.cliente.genero = res.data.genero;
          }
        }, (error) =>
        {
            this.mostrar = false;
            this.toastrService.error('Erronia', 'Cedula');
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
