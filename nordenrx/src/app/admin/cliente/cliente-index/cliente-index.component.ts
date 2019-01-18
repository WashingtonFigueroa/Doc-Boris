import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../cliente.service';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.scss']
})
export class ClienteIndexComponent implements OnInit {

  base = environment.servidor;
  paginacion: any = null;
  pages: any = [];
  buscarGroup: FormGroup;
  constructor(private clienteService: ClienteService,
              private fb: FormBuilder) {
    this.createForm();
    this.clienteService.index()
      .subscribe((res: any) => {
        this.paginacion = res;
        this.loadPages();
      });
  }

  ngOnInit() {
  }

  createForm() {
    this.buscarGroup = this.fb.group({
      'valor' : new FormControl()
    });
  }

  loadPages() {
    this.pages = [];
    for (let i = 1; i <= this.paginacion.last_page; i++) {
      this.pages.push({
        page: i,
        url: this.base + 'clientes?page=' + i
      });
    }
  }

  go(url) {
    this.clienteService.go(url)
      .subscribe((res: any) => {
        this.paginacion = res;
        this.loadPages();
      });
  }

  buscar() {
    const valor = this.buscarGroup.value.valor;
    this.clienteService.buscar(valor)
      .subscribe((res: any) => {
        this.paginacion = res;
        this.loadPages();
      });
  }

  destroy(cliente, index) {
    if (confirm('Esta seguro de eliminar a ' + cliente.nombres + '?')) {
      this.clienteService.destroy(cliente.cliente_id)
        .subscribe((res: any) => {
          this.paginacion.data.splice(index, 1);
        });
    }
  }
}
