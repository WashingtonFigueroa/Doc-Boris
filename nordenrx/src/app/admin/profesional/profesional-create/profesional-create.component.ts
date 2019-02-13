import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfesionalService} from "../profesional.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profesional-create',
  templateUrl: './profesional-create.component.html',
  styleUrls: ['./profesional-create.component.scss']
})
export class ProfesionalCreateComponent implements OnInit {
    mostrar = false;
    profesionalGroup: FormGroup;
    profesional: any = {
        profesional_id : 0,
        documento : '',
        razon_social : '',
        especialidad : '',
        direccion: '',
        email : '',
        celular : '',
    };
    constructor(private router: Router,
                private fb: FormBuilder,
                private profesionalService: ProfesionalService,
                private toastrService:ToastrService) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.profesionalGroup = this.fb.group({
            'documento' : new FormControl(''),
            'razon_social' : new FormControl('', [Validators.required]),
            'especialidad' : new FormControl(''),
            'direccion' : new FormControl(''),
            'email' : new FormControl(''),
            'celular' : new FormControl('')
        });
    }

    store() {
        this.profesionalService.store(this.profesionalGroup.value)
            .subscribe((res: any) => {
                this.toastrService.success('El profesional ' + res.razon_social + ' fue guardado exitosamente');
                this.router.navigate(['/admin/profesionales']);
            });
    }
    resetProfesional() {
        this.profesional = {
            profesional_id : 0,
            documento : '',
            razon_social : '',
            especialidad : '',
            direccion: '',
            email : '',
            celular : '',
        };
   }

    searchPerson() {
        this.mostrar =true;
        this.resetProfesional();
        const documento = this.profesionalGroup.value.documento;
        this.profesionalService.sri(documento)
            .subscribe((res: any) => {
                this.mostrar = false;
                if (res.type === 'sri') {
                    this.profesionalGroup.patchValue({
                        'razon_social' : res.data.data.nombreCompleto,
                        'direccion' : res.data.data.residencia,
                    });
                } else {
                    this.profesionalGroup.patchValue({
                        'profesional_id' : res.data.profesional_id,
                        'documento' : res.data.documento,
                        'razon_social' : res.data.razon_social,
                        'direccion' : res.data.direccion,
                        'especialidad' : res.data.especialidad,
                        'email' : res.data.email,
                        'celular' : res.data.celular
                    });
                    this.profesional.razon_social = res.data.razon_social;
                    this.profesional.documento = res.data.documento;
                    this.profesional.direccion = res.data.direccion;
                    this.profesional.especialidad = res.data.especialidad;
                    this.profesional.email = res.data.email;
                    this.profesional.celular = res.data.celular;
                }
            }, (error) =>
            {
                this.mostrar = false;
                this.toastrService.error('Erronia', 'Cedula');
            });
    }
}

