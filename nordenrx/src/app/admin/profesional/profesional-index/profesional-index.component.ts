import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {ProfesionalService} from '../profesional.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profesional-index',
  templateUrl: './profesional-index.component.html',
  styleUrls: ['./profesional-index.component.scss']
})
export class ProfesionalIndexComponent implements OnInit {
    prev_page: string = null;
    next_page: string = null;
    last_page: number = null;
    pages: any = [];
    current_page: any = null;
    profesionales: any = null;
    valor = '';
    constructor(private profesionalService: ProfesionalService,
                private toastrService:ToastrService ) {
        this.profesionalService.index().subscribe((res: any) => {
            this.profesionales = res;
            this.current_page = this.profesionales.current_page;
            this.prev_page = this.profesionales.prev_page_url;
            this.next_page = this.profesionales.next_page_url;
            this.last_page = this.profesionales.last_page;
            this.loadPages();
        });
    }
    ngOnInit() {
    }
    loadPages() {
        this.pages = [];
        for (let i = 1; i <= this.profesionales.last_page;  i++) {
            this.pages.push({
                page: i,
                url: this.profesionales.path + '?page=' + i
            });
        }
    }
    loadPagination(url: string) {
        this.profesionalService.pagination(url)
            .subscribe((res: any) => {
                this.profesionales = res;
                this.current_page = this.profesionales.current_page;
                this.prev_page = this.profesionales.prev_page_url;
                this.next_page = this.profesionales.next_page_url;
                this.last_page = this.profesionales.last_page;
                this.loadPages();
            });
    }
    buscar(valor: string) {
        this.profesionalService.buscar(valor)
            .subscribe((res: any) => {
                this.profesionales = res;
                this.current_page = this.profesionales.current_page;
                this.prev_page = this.profesionales.prev_page_url;
                this.next_page = this.profesionales.next_page_url;
                this.last_page = this.profesionales.last_page;
                this.loadPages();
            });
    }
    destroy(profesionales, index) {
        if (confirm('Esta seguro de eliminar al Sr/a: ' + profesionales.razon_social +'  ?.')) {
            this.profesionalService.destroy(profesionales.profesional_id)
                .subscribe((res: any) => {
                    this.profesionales.data.splice(index, 1);
                });
        }
    }
}
