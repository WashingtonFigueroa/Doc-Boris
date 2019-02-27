import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RadiografiaService} from './radiografia.service';
import { environment } from '../../../environments/environment.prod';
import {ClienteService} from '../cliente/cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsultaService} from '../consulta/consulta.service';
import {ToastrService} from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import {ProfesionalService} from '../profesional/profesional.service';

@Component({
  selector: 'app-radiografia',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './radiografia.component.html',
  styleUrls: ['./radiografia.component.css']
})
export class RadiografiaComponent implements OnInit {

  radiografias: any = [];
  tipos: any = [];
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
  profesionales: any = [];
  mostrar = false;
  profesional_id: number = null;
  img = environment.servidor + 'radiografia/';
  consultaGroup: FormGroup;
  categoria = null;
  tomografias = null;

  constructor(private radiografiaService: RadiografiaService,
              private consultaService: ConsultaService,
              private profesionalService: ProfesionalService,
              private fb: FormBuilder,
              private clienteService: ClienteService,
              private toastrService: ToastrService,
              private config: NgSelectModule) {
      this.profesionalService.listar()
          .subscribe((res: any) => {
              this.profesionales = res;
          });
      this.radiografiaService.tomografiasNoAsignadas()
          .subscribe((res: any) => {
            this.tomografias = res;
          });
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
      'cliente_id' : [0],
      'profesional_id' : [0],
      'numero_factura' : ['', [Validators.required]],
      'imagen' : [''],
      'categoria' : [this.categoria],
      'tipo_documento' : ['cedula'],
      'tipo_id' : [0],
      'valor' : ['', [Validators.required]],
      'radiografia_tomografia_id' : [0],

      'documento' : ['', [Validators.required]],
      'razon_social' : ['', [Validators.required]],
      'direccion' : [''],
      'fecha_nacimiento' : ['', [Validators.required]],
      'celular' : [''],
      'genero' : [''],
    });
  }

  searchPerson() {
    this.mostrar = true;
    this.resetCliente();
    const documento = this.consultaGroup.value.documento;
    this.radiografiaService
        .sri(documento)
        .subscribe((res: any) => {
          this.mostrar = false;
          if (res.type === 'sri') {
            let fecha_nac = res.data.data.fechaNacimiento;
            fecha_nac = fecha_nac.split('/');
            const fecha_nacimiento = fecha_nac[2] + '-' + fecha_nac[1] + '-' + fecha_nac[0];
                  this.consultaGroup.patchValue({
                      'razon_social' : res.data.data.nombreCompleto,
                      'direccion' : res.data.data.residencia,
                      'fecha_nacimiento' : fecha_nacimiento,
                      'genero' : res.data.data.genero
                  });
          } else {
            this.consultaGroup.patchValue({
              'cliente_id' : res.data.cliente_id,
              'razon_social' : res.data.razon_social,
              'tipo_documento' : res.data.tipo_documento,
              'documento' : res.data.documento,
              'direccion' : res.data.direccion,
              'fecha_nacimiento' : res.data.fecha_nacimiento,
              'celular' : res.data.celular,
              'genero' : res.data.genero
            });
            this.cliente.razon_social = res.data.razon_social;
            this.cliente.tipo_documento = res.data.tipo_documento;
            this.cliente.documento = res.data.documento;
            this.cliente.direccion = res.data.direccion;
            this.cliente.fecha_nacimiento = res.data.fecha_nacimiento;
            this.cliente.celular = res.data.celular;
            this.cliente.genero = res.data.genero;
          }
        }, (error) => {
            this.mostrar = false;
            this.toastrService.error('Erronia', 'Cedula');
        });
  }

  asociar(categoria: string) {
    this.asociado = true;
    this.categoria = categoria;
    if (categoria === 'radiografia') {
        this.radiografiaService.tipoRadiografias()
            .subscribe((res: any) => {
                this.tipos = res;
            });
    }  else {
        this.radiografiaService.tipoTomografias()
            .subscribe((res: any) => {
                this.tipos = res;
            });
    }
  }

  save() {
    switch (this.categoria) {
      case 'radiografia' :
        this.consultaGroup.patchValue({
          'radiografia_tomografia_id' : +this.imagen.radiografia_tomografia_id,
          'cliente_id' : +this.consultaGroup.value.cliente_id,
          'imagen' : this.imagen.archivo,
          'categoria' : this.categoria
        });
        break;
      case 'tomografia' :
        this.consultaGroup.patchValue({
          'radiografia_tomografia_id' : +this.consultaGroup.value.radiografia_tomografia_id,
          'cliente_id' : +this.consultaGroup.value.cliente_id,
          'imagen' : '../../assets/img/tomografia.jpg',
          'categoria' : this.categoria
        });
        break;
    }
    const question  = '¿Esta seguro que desea registrar la consulta con número de factura: ';
    if (confirm(`${question} ${this.consultaGroup.value.numero_factura}?`)) {
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