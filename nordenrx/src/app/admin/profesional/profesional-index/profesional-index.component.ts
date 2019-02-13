import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProfesionalService} from "../profesional.service";

@Component({
  selector: 'app-profesional-index',
  templateUrl: './profesional-index.component.html',
  styleUrls: ['./profesional-index.component.scss']
})
export class ProfesionalIndexComponent implements OnInit {

    base = environment.servidor;
    paginacion: any = null;
    pages: any = [];
    profesionalGroup: FormGroup;
    constructor(private profesionalService: ProfesionalService,
                private fb: FormBuilder) {
        this.createForm();
        this.profesionalService.index()
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    ngOnInit() {
    }

    createForm() {
        this.profesionalGroup = this.fb.group({
            'valor' : new FormControl()
        });
    }

    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.paginacion.last_page; i++) {
            this.pages.push({
                page: i,
                url: this.base + 'profesionales?page=' + i
        });
        }
    }

    go(url) {
        this.profesionalService.go(url)
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    buscar() {
        const valor = this.profesionalGroup.value.valor;
        this.profesionalService.buscar(valor)
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    destroy(profesional, index) {
        if (confirm('Esta seguro de eliminar a ' + profesional.nombres + '?')) {
            this.profesionalService.destroy(profesional.profesional_id)
                .subscribe((res: any) => {
                    this.paginacion.data.splice(index, 1);
                });
        }
    }
}
