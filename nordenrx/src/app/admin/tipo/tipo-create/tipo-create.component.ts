import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TipoService} from '../tipo.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tipo-create',
  templateUrl: './tipo-create.component.html',
  styleUrls: ['./tipo-create.component.scss']
})
export class TipoCreateComponent implements OnInit {

    tipoGroup: FormGroup;
    constructor(private router: Router,
                private fb: FormBuilder,
                private tipoService: TipoService,
                private toastrService: ToastrService) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.tipoGroup = this.fb.group({
            'categoria' : new FormControl('', [Validators.required]),
            'tipo' : new FormControl('', [Validators.required])
        });
    }

    store() {
        this.tipoService.store(this.tipoGroup.value)
            .subscribe((res: any) => {
                this.toastrService.success('Datos Registrados','tipo Rx');
                this.router.navigate(['/admin/tipos']);
            });
    }

}
