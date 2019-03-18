import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClienteService} from '../cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent implements OnInit {
   clienteGroup: FormGroup;
   mostrar = false;
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
  constructor(private router: Router,
              private fb: FormBuilder,
              private clienteService: ClienteService,
              private toastrService: ToastrService) {
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
        this.clienteGroup.patchValue({
            'cliente_id' : 0,
            'razon_social' : '',
            'direccion' : '',
            'fecha_nacimiento' : '',
            'celular' : '',
            'genero' : 'varon'
        });
    }
    resetValues() {
        this.clientes = [];
    }
  createForm() {
    this.clienteGroup = this.fb.group({
      'tipo_documento' : new FormControl('cedula', [Validators.required]),
      'documento' : new FormControl('', [Validators.required]),
      'razon_social' : new FormControl('', [Validators.required]),
      'direccion' : new FormControl('', [Validators.required]),
      'fecha_nacimiento' : new FormControl('', [Validators.required]),
      'celular' : new FormControl('', [Validators.required]),
      'genero' : new FormControl('', [Validators.required])
    });
  }

  store() {
      const formData = new FormData();
      formData.append('tipo_documento', this.clienteGroup.value.tipo_documento);
      formData.append('documento', this.clienteGroup.value.documento);
      formData.append('razon_social', this.clienteGroup.value.razon_social.toUpperCase());
      formData.append('direccion',this.clienteGroup.value.direccion.toUpperCase());
      formData.append('fecha_nacimiento',this.clienteGroup.value.fecha_nacimiento);
      formData.append('celular',this.clienteGroup.value.celular);
      formData.append('genero',this.clienteGroup.value.genero);
    this.clienteService.store(this.clienteGroup.value)
      .subscribe((res: any) => {
          this.toastrService.success('El paciente ' + res.razon_social + ' fue guardado exitosamente');
        this.router.navigate(['/admin/clientes']);
      });
  }
    searchPerson() {
        this.mostrar = true;
        this.resetCliente();
        const documento = this.clienteGroup.value.documento;
        this.clienteService
            .sri(documento)
            .subscribe((res: any) => {
                this.mostrar = false;
                if (res.type === 'sri') {
                    let fecha_nac = res.data.data.fechaNacimiento;
                    fecha_nac = fecha_nac.split('/');
                    const fecha_nacimiento = fecha_nac[2] + '-' + fecha_nac[1] + '-' + fecha_nac[0];
                    this.clienteGroup.patchValue({
                        'razon_social' : res.data.data.nombreCompleto,
                        'direccion' : res.data.data.residencia,
                        'fecha_nacimiento' : fecha_nacimiento,
                        'genero' : res.data.data.genero
                    });
                } else {
                    this.clienteGroup.patchValue({
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

}
