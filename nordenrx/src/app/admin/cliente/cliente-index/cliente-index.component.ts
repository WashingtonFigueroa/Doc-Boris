import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../cliente.service';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.scss']
})
export class ClienteIndexComponent implements OnInit {
    prev_page: string = null;
    next_page: string = null;
    last_page: number = null;
    pages: any = [];
    current_page: any = null;
    pacientes: any = null;
    valor = '';
    constructor(private pacienteService: ClienteService,
                private toastrService:ToastrService ) {
        this.pacienteService.index().subscribe((res: any) => {
            this.pacientes = res;
            this.current_page = this.pacientes.current_page;
            this.prev_page = this.pacientes.prev_page_url;
            this.next_page = this.pacientes.next_page_url;
            this.last_page = this.pacientes.last_page;
            this.loadPages();
        });
    }
    ngOnInit() {
    }
    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.pacientes.last_page;  i++) {
            this.pages.push({
                page: i,
                url: this.pacientes.path + '?page=' + i
            });
        }
    }
    loadPagination(url: string) {
        this.pacienteService.pagination(url)
            .subscribe((res: any) => {
                this.pacientes = res;
                this.current_page = this.pacientes.current_page;
                this.prev_page = this.pacientes.prev_page_url;
                this.next_page = this.pacientes.next_page_url;
                this.last_page = this.pacientes.last_page;
                this.loadPages();
            });
    }
    buscar(valor: string) {
        this.pacienteService.buscar(valor)
            .subscribe((res: any) => {
                this.pacientes = res;
                this.current_page = this.pacientes.current_page;
                this.prev_page = this.pacientes.prev_page_url;
                this.next_page = this.pacientes.next_page_url;
                this.last_page = this.pacientes.last_page;
                this.loadPages();
            });
    }
    destroy(paciente, index) {
        if (confirm('Esta seguro de eliminar al paciente ' + paciente.razon_social + ' ?.')) {
            this.pacienteService.destroy(paciente.cliente_id)
                .subscribe((res: any) => {
                    this.pacientes.data.splice(index, 1);
                });
        }
    }
}
