import { Component, OnInit } from '@angular/core';
import {MensajesService} from '../mensajes.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-mensajes-index',
  templateUrl: './mensajes-index.component.html',
  styleUrls: ['./mensajes-index.component.scss']
})
export class MensajesIndexComponent implements OnInit {
    prev_page: string = null;
    next_page: string = null;
    last_page: number = null;
    pages: any = [];
    current_page: any = null;
    mensajes: any = null;
    valor = '';
    constructor(private mensajeService: MensajesService,
                private toastrService:ToastrService ) {
        this.mensajeService.index().subscribe((res: any) => {
            this.mensajes = res;
            this.current_page = this.mensajes.current_page;
            this.prev_page = this.mensajes.prev_page_url;
            this.next_page = this.mensajes.next_page_url;
            this.last_page = this.mensajes.last_page;
            this.loadPages();
        });
    }
    ngOnInit() {
    }
    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.mensajes.last_page;  i++) {
            this.pages.push({
                page: i,
                url: this.mensajes.path + '?page=' + i
            });
        }
    }
    loadPagination(url: string) {
        this.mensajeService.pagination(url)
            .subscribe((res: any) => {
                this.mensajes = res;
                this.current_page = this.mensajes.current_page;
                this.prev_page = this.mensajes.prev_page_url;
                this.next_page = this.mensajes.next_page_url;
                this.last_page = this.mensajes.last_page;
                this.loadPages();
            });
    }
    buscar(valor: string) {
        this.mensajeService.buscar(valor)
            .subscribe((res: any) => {
                this.mensajes = res;
                this.current_page = this.mensajes.current_page;
                this.prev_page = this.mensajes.prev_page_url;
                this.next_page = this.mensajes.next_page_url;
                this.last_page = this.mensajes.last_page;
                this.loadPages();
            });
    }
    destroy(mensaje, index) {
        if (confirm('Esta seguro de eliminar al mensaje ' + mensaje.asunto)) {
            this.mensajeService.destroy(mensaje.mensaje_id)
                .subscribe((res: any) => {
                    this.mensajes.data.splice(index, 1);
                });
        }
    }
}
