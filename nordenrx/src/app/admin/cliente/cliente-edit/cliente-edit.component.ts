import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {
  clienteGroup: FormGroup;
  cliente_id: number = null;
  cliente: any = null;
  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.route.params.subscribe((param: any) => {
      this.cliente_id = param.cliente_id;
      this.clienteService.show(param.cliente_id)
        .subscribe((res: any) => {
          this.cliente = res;
          this.createForm();
        });
    });
  }

  createForm() {
    this.clienteGroup = this.fb.group({
      'nombres' : new FormControl(this.cliente.nombres, [Validators.required]),
      'cedula' : new FormControl(this.cliente.cedula, [Validators.required]),
      'fecha_nacimiento' : new FormControl(this.cliente.fecha_nacimiento, [Validators.required]),
      'celular' : new FormControl(this.cliente.celular, [Validators.required])
    });
  }
  ngOnInit() {
  }

  update() {
    this.clienteService.update(this.cliente_id, this.clienteGroup.value)
      .subscribe((res: any) => {
        alert('El cliente ' + this.clienteGroup.value.nombres + ' fue actualizado exitosamente');
        this.router.navigate(['/admin/clientes']);
      });
  }

}