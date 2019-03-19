import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ContactosService} from './contactos.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
mensajeGroup:FormGroup;
  constructor(private fb: FormBuilder,
              private mensajeService: ContactosService,
              private toastrService: ToastrService) {
      this.createForm();
  }

  ngOnInit() {
  }
  createForm(){
      this.mensajeGroup = this.fb.group({
          'nombre' : new FormControl('', [Validators.required]),
          'email': new FormControl('', [Validators.pattern(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)]),
          'asunto' : new FormControl('', [Validators.required]),
          'mensaje' : new FormControl('', [Validators.required]),
      })
  }
  store(){
      const formData = new FormData();
      formData.append('nombre', this.mensajeGroup.value.nombre.toUpperCase());
      formData.append('email', this.mensajeGroup.value.email);
      formData.append('asunto', this.mensajeGroup.value.asunto.toUpperCase());
      formData.append('mensaje', this.mensajeGroup.value.mensaje.toUpperCase());
  this.mensajeService.store(formData).subscribe((res: any) => {
      this.toastrService.info('Enviado', 'Mensaje');
      this.mensajeGroup.reset();
    })
  }
}
