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
      'nombres' : new FormControl('', [Validators.required]),
      'cedula' : new FormControl('', [Validators.required]),
      'fecha_nacimiento' : new FormControl('', [Validators.required]),
      'celular' : new FormControl('', [Validators.required])
    });
  }

  store() {
    this.clienteService.store(this.clienteGroup.value)
      .subscribe((res: any) => {
        alert('El cliente ' + res.nombres + ' fue guardado exitosamente');
        this.router.navigate(['/admin/clientes']);
      });
  }

}
