import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TipoService} from '../tipo.service';

@Component({
  selector: 'app-tipo-index',
  templateUrl: './tipo-index.component.html',
  styleUrls: ['./tipo-index.component.scss']
})
export class TipoIndexComponent implements OnInit {

    base = environment.servidor;
    paginacion: any = null;
    pages: any = [];
    tipoGroup: FormGroup;
    constructor(private tipoService: TipoService,
                private fb: FormBuilder) {
        this.createForm();
        this.tipoService.index()
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    ngOnInit() {
    }

    createForm() {
        this.tipoGroup = this.fb.group({
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
        this.tipoService.go(url)
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    buscar() {
        const valor = this.tipoGroup.value.valor;
        this.tipoService.buscar(valor)
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    destroy(tipo, index) {
        if (confirm('Esta seguro de eliminar a ' + tipo.nombres + '?')) {
            this.tipoService.destroy(tipo.tipo_id)
                .subscribe((res: any) => {
                    this.paginacion.data.splice(index, 1);
                });
        }
    }
}
