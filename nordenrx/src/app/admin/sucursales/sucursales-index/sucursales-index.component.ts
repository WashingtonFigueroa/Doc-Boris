import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SucursalesService} from '../sucursales.service';

@Component({
  selector: 'app-sucursales-index',
  templateUrl: './sucursales-index.component.html',
  styleUrls: ['./sucursales-index.component.scss']
})
export class SucursalesIndexComponent implements OnInit {

    base = environment.servidor;
    paginacion: any = null;
    pages: any = [];
    sucursalGroup: FormGroup;
    constructor(private sucursalService: SucursalesService,
                private fb: FormBuilder) {
        this.createForm();
        this.sucursalService.index()
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    ngOnInit() {
    }

    createForm() {
        this.sucursalGroup = this.fb.group({
            'valor' : new FormControl()
        });
    }

    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.paginacion.last_page; i++) {
            this.pages.push({
                page: i,
                url: this.base + 'sucursales?page=' + i
            });
        }
    }

    go(url) {
        this.sucursalService.go(url)
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    buscar() {
        const valor = this.sucursalGroup.value.valor;
        this.sucursalService.buscar(valor)
            .subscribe((res: any) => {
                this.paginacion = res;
                this.loadPages();
            });
    }

    destroy(sucursal, index) {
        if (confirm('Esta seguro de eliminar a ' + sucursal.ciudad + '?')) {
            this.sucursalService.destroy(sucursal.sucursal_id)
                .subscribe((res: any) => {
                    this.paginacion.data.splice(index, 1);
                });
        }
    }
}
