import { Component, OnInit } from '@angular/core';
import {ReporteService} from '../reporte.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

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
    myDate = new Date();

    constructor(private reporteService: ReporteService,
                private fb: FormBuilder,
                private toastrService: ToastrService) {
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
        this.createForm();
    }

  ngOnInit() {

  }
    createForm() {
        this.buscarGroup = this.fb.group({
            'start' : new FormControl('', [Validators.required]),
            'end' : new FormControl('', [Validators.required])
        });
    }

    totalfactura() {
        const start = this.buscarGroup.value.start;
        const end = this.buscarGroup.value.end;
        if (start !== end) {
            this.reporteService.valorconsulta(start, end)
                .subscribe((res: any) => {
                    this.valor = res;
                });
        } else {
            this.toastrService.info('Seleccione un arango de fechas','Consulta');
        }
    }

}
