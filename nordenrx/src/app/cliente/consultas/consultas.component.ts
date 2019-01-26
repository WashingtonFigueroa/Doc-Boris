import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment.prod";
import {ConsultaService} from "../../admin/consulta/consulta.service";

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
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
