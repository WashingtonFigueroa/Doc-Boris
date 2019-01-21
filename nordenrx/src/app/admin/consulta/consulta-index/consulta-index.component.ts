import { Component, OnInit } from '@angular/core';
import {ConsultaService} from '../consulta.service';
import {environment} from '../../../../environments/environment.prod';

@Component({
  selector: 'app-consulta-index',
  templateUrl: './consulta-index.component.html',
  styleUrls: ['./consulta-index.component.scss']
})
export class ConsultaIndexComponent implements OnInit {

  consultas: any = null;
  base = environment.servidor;
  constructor(private consultaService: ConsultaService) {
    this.consultaService.index()
      .subscribe((res: any) => {
        this.consultas = res;
      });
  }

  ngOnInit() {
  }

}
