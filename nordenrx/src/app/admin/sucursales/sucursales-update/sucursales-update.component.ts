import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SucursalesService} from '../sucursales.service';

@Component({
  selector: 'app-sucursales-update',
  templateUrl: './sucursales-update.component.html',
  styleUrls: ['./sucursales-update.component.scss']
})
export class SucursalesUpdateComponent implements OnInit {
    sucursalGroup: FormGroup;
    sucursal_id: number = null;
    sucursal: any = null;
    constructor(private sucursalService: SucursalesService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private toastrService: ToastrService) {
        this.route.params.subscribe((param: any) => {
            this.sucursal_id = param.sucursal_id;
            this.sucursalService.show(param.sucursal_id)
                .subscribe((res: any) => {
                    this.sucursal = res;
                    this.createForm();
                });
        });
    }

    createForm() {
        this.sucursalGroup = this.fb.group({
            'ciudad' : new FormControl(this.sucursal.ciudad, [Validators.required]),
            'direccion' : new FormControl(this.sucursal.direccion, [Validators.required]),
            'telefono' : new FormControl(this.sucursal.telefono)
        });
    }
    ngOnInit() {
    }

    update() {
        this.sucursalService.update(this.sucursal_id, this.sucursalGroup.value)
            .subscribe((res: any) => {
                this.toastrService.success('La sucursal ' + this.sucursalGroup.value.ciudad + ' fue actualizado exitosamente');
                this.router.navigate(['/admin/sucursales']);
            });
    }

}
