import { Component, OnInit } from '@angular/core';
import {ConsultaService} from '../consulta.service';
import {environment} from '../../../../environments/environment.prod';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-consulta-index',
  templateUrl: './consulta-index.component.html',
  styleUrls: ['./consulta-index.component.scss']
})
export class ConsultaIndexComponent implements OnInit {

  consultas: any = null;
  buscarGroup: FormGroup;
  base = environment.servidor;
  constructor(private consultaService: ConsultaService,
              private fb: FormBuilder) {
    this.consultaService.index()
      .subscribe((res: any) => {
        this.consultas = res;
      });
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.buscarGroup = this.fb.group({
      'valor': ['']
    });
  }
}
