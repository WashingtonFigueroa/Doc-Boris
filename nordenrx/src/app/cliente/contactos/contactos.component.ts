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
          'email' : new FormControl('', [Validators.required]),
          'asunto' : new FormControl('', [Validators.required]),
          'mensaje' : new FormControl('', [Validators.required]),
      })
  }
  store(){
this.mensajeService.store(this.mensajeGroup.value).subscribe((res: any) => {
  this.toastrService.info('Enviado', 'Mensaje');
  this.mensajeGroup.reset();
})
  }
}
