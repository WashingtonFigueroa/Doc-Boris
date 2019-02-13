import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfesionalService} from "../../profesional/profesional.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profesional-update',
  templateUrl: './profesional-update.component.html',
  styleUrls: ['./profesional-update.component.scss']
})
export class ProfesionalUpdateComponent implements OnInit {
    profesionalGroup: FormGroup;
    profesional_id: number = null;
    profesional: any = null;
    constructor(private profesionalService: ProfesionalService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private toastrService: ToastrService) {
        this.route.params.subscribe((param: any) => {
            this.profesional_id = param.profesional_id;
            this.profesionalService.show(param.profesional_id)
                .subscribe((res: any) => {
                    this.profesional = res;
                    this.createForm();
                });
        });
    }

    createForm() {
        this.profesionalGroup = this.fb.group({
            'documento' : new FormControl(this.profesional.documento),
            'razon_social' : new FormControl(this.profesional.razon_social, [Validators.required]),
            'especialidad' : new FormControl(this.profesional.especialidad),
            'direccion' : new FormControl(this.profesional.direccion),
            'email' : new FormControl(this.profesional.email),
            'celular' : new FormControl(this.profesional.celular)
        });
    }
    ngOnInit() {
    }

    update() {
        this.profesionalService.update(this.profesional_id, this.profesionalGroup.value)
            .subscribe((res: any) => {
                this.toastrService.success('El profesional ' + this.profesionalGroup.value.razon_social + ' fue actualizado exitosamente');
                this.router.navigate(['/admin/profesionales']);
            });
    }

}
