import { Component, OnInit } from '@angular/core';
import {ReporteService} from "../reporte.service";
import {FormBuilder, FormGroup} from '@angular/forms';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-reporte-index',
  templateUrl: './reporte-index.component.html',
  styleUrls: ['./reporte-index.component.scss']
})
export class ReporteIndexComponent implements OnInit {
    sumradiografias: any = null;
    sumconsultas: any = null;
    diferencia: any = null;
    valor: any = null;
    buscarGroup: FormGroup;
    CurrentDate = new Date();

    constructor(private reporteService: ReporteService,
                private fb: FormBuilder) {
        this.reporteService.sumradiografias()
            .subscribe((res: any) => {
                this.sumradiografias = res;
            });
        this.reporteService.sumrconsultas()
            .subscribe((res: any) => {
                this.sumconsultas = res;
            });
        this.reporteService.diferencia()
            .subscribe((res: any) => {
                this.diferencia = res;
            });
        this.reporteService.valorconsulta()
            .subscribe((res: any) => {
                this.valor = res;
            });
    }

  ngOnInit() {

  }

    // totalfactura() {
    //
    //     const start = this.buscarGroup.value.valor;
    //     const end = this.buscarGroup.value.valor;
    //     this.reporteService.valorconsulta(start,end)
    //         .subscribe((res: any) => {
    //             this.valor = res;
    //         });
    // }

}
