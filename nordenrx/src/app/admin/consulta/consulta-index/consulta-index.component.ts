import { Component, OnInit } from '@angular/core';
import {ConsultaService} from '../consulta.service';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProfesionalService} from "../../profesional/profesional.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-consulta-index',
  templateUrl: './consulta-index.component.html',
  styleUrls: ['./consulta-index.component.scss']
})
export class ConsultaIndexComponent implements OnInit {
    prev_page: string = null;
    next_page: string = null;
    last_page: number = null;
    pages: any = [];
    current_page: any = null;
    consultas: any = null;
    url_base = environment.servidor + 'consultas-imagen/';
    valor = '';
    constructor(private consultaService: ConsultaService,
                private toastrService:ToastrService ) {
        this.consultaService.index().subscribe((res: any) => {
            this.consultas = res;
            this.current_page = this.consultas.current_page;
            this.prev_page = this.consultas.prev_page_url;
            this.next_page = this.consultas.next_page_url;
            this.last_page = this.consultas.last_page;
            this.loadPages();
        });
    }
    ngOnInit() {
    }
    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.consultas.last_page;  i++) {
            this.pages.push({
                page: i,
                url: this.consultas.path + '?page=' + i
            });
        }
    }
    loadPagination(url: string) {
        this.consultaService.pagination(url)
            .subscribe((res: any) => {
                this.consultas = res;
                this.current_page = this.consultas.current_page;
                this.prev_page = this.consultas.prev_page_url;
                this.next_page = this.consultas.next_page_url;
                this.last_page = this.consultas.last_page;
                this.loadPages();
            });
    }
    buscar(valor: string) {
        this.consultaService.buscar(valor)
            .subscribe((res: any) => {
                this.consultas = res;
                this.current_page = this.consultas.current_page;
                this.prev_page = this.consultas.prev_page_url;
                this.next_page = this.consultas.next_page_url;
                this.last_page = this.consultas.last_page;
                this.loadPages();
            });
    }
}