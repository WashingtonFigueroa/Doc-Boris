import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TipoService} from '../tipo.service';

@Component({
  selector: 'app-tipo-update',
  templateUrl: './tipo-update.component.html',
  styleUrls: ['./tipo-update.component.scss']
})
export class TipoUpdateComponent implements OnInit {
    tipoGroup: FormGroup;
    tipo_id: number = null;
    tipo: any = null;
    constructor(private tipoService: TipoService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private toastrService: ToastrService) {
        this.route.params.subscribe((param: any) => {
            this.tipo_id = param.tipo_id;
            this.tipoService.show(param.tipo_id)
                .subscribe((res: any) => {
                    this.tipo = res;
                    this.createForm();
                });
        });
    }

    createForm() {
        this.tipoGroup = this.fb.group({
            'categoria' : new FormControl(this.tipo.categoria, [Validators.required]),
            'tipo' : new FormControl(this.tipo.tipo, [Validators.required])
        });
    }
    ngOnInit() {
    }

    update() {
        this.tipoService.update(this.tipo_id, this.tipoGroup.value)
            .subscribe((res: any) => {
                this.toastrService.success('El tipo Rx' + this.tipoGroup.value.tipo + ' fue actualizado exitosamente');
                this.router.navigate(['/admin/tipos']);
            });
    }

}
