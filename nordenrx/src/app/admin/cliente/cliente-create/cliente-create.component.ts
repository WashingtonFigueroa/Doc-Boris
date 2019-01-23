import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClienteService} from '../cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent implements OnInit {

  clienteGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private clienteService: ClienteService) {
    this.createForm();
  }

  ngOnInit() {
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
    this.clienteService.store(this.clienteGroup.value)
      .subscribe((res: any) => {
        alert('El cliente ' + res.razon_social + ' fue guardado exitosamente');
        this.router.navigate(['/admin/clientes']);
      });
  }

}
