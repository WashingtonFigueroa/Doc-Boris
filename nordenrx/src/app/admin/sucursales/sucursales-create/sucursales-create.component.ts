import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SucursalesService} from '../sucursales.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sucursales-create',
  templateUrl: './sucursales-create.component.html',
  styleUrls: ['./sucursales-create.component.scss']
})
export class SucursalesCreateComponent implements OnInit {

    sucursalGroup: FormGroup;
    constructor(private router: Router,
                private fb: FormBuilder,
                private sucursalService: SucursalesService,
                private  toastrService: ToastrService) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.sucursalGroup = this.fb.group({
            'ciudad' : new FormControl('', [Validators.required]),
            'direccion' : new FormControl('', [Validators.required]),
            'telefono' : new FormControl('')
        });
    }

    store() {
        this.sucursalService.store(this.sucursalGroup.value)
            .subscribe((res: any) => {
                this.toastrService.success('Datos Registrados','Sucursal');
                this.router.navigate(['/admin/sucursales']);
            });
    }

}
