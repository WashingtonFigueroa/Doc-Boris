import { Component, OnInit } from '@angular/core';
import {ConsultaService} from '../consulta.service';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProfesionalService} from "../../profesional/profesional.service";

@Component({
  selector: 'app-consulta-index',
  templateUrl: './consulta-index.component.html',
  styleUrls: ['./consulta-index.component.scss']
})
export class ConsultaIndexComponent implements OnInit {
    base = environment.servidor;
    consultas: any = null;
    pages: any = [];
    consultaGroup: FormGroup;
    constructor(private consultaService: ConsultaService,
                private fb: FormBuilder) {
        this.createForm();
        this.consultaService.index()
            .subscribe((res: any) => {
                this.consultas = res;
                this.loadPages();
            });
    }

    ngOnInit() {
    }

    createForm() {
        this.consultaGroup = this.fb.group({
            'valor' : new FormControl()
        });
    }

    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.consultas.last_page; i++) {
            this.pages.push({
                page: i,
                url: this.base + 'profesionales?page=' + i
            });
        }
    }

    go(url) {
        this.consultaService.go(url)
            .subscribe((res: any) => {
                this.consultas = res;
                this.loadPages();
            });
    }

    buscar() {
        const valor = this.consultaGroup.value.valor;
        this.consultaService.buscar(valor)
            .subscribe((res: any) => {
                this.consultas = res;
                this.loadPages();
            });
    }

}
