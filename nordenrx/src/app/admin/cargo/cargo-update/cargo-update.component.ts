import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CargoService} from '../cargo.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cargo-update',
  templateUrl: './cargo-update.component.html',
  styleUrls: ['./cargo-update.component.scss']
})
export class CargoUpdateComponent implements OnInit {

    cargo_id: number = null;
    cargo: any = null;
    cargoGroup: FormGroup;
    loading: boolean = true;
    constructor(private cargoService: CargoService,
                private tostr: ToastrService,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder) {
        this.route.params.subscribe((params: any) => {
            this.cargo_id = params.cargo_id;
            this.cargoService.show(this.cargo_id)
                .subscribe((cargo: any) => {
                    this.loading = false;
                    this.cargo = cargo;
                    this.createForm();
                });
        });
    }

    ngOnInit() {
    }

    createForm() {
        this.cargoGroup = this.fb.group({
            'nombre' : [this.cargo.nombre, Validators.required],
            'descripcion' : [this.cargo.descripcion, Validators.required]
        });
    }

    update() {
        this.cargoService.update(this.cargoGroup.value, this.cargo_id)
            .subscribe((cargo: any) => {
                console.log(cargo);
                this.tostr.success('<span class="now-ui-icons ui-1_bell-53"></span> Cargo actualizado exitosamente.', '', {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-info alert-with-icon",
                    positionClass: 'toast-top-right'
                });
                this.router.navigate(['/admin/cargos']);
            });
    }
}
