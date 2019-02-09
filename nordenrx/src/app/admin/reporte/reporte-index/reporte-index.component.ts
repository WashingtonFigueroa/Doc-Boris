import { Component, OnInit } from '@angular/core';
import {ReporteService} from "../reporte.service";
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reporte-index',
  templateUrl: './reporte-index.component.html',
  styleUrls: ['./reporte-index.component.scss']
})
export class ReporteIndexComponent implements OnInit {
    sumradiografias: any = null;
    sumconsultas: any = null;
    diferencia: any = null;
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
    }

  ngOnInit() {
  }

}
