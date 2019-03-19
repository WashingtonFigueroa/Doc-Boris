import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CargoService} from '../cargo.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.scss']
})
export class CargoCreateComponent implements OnInit {

    cargoGroup: FormGroup;
    constructor(private cargoService: CargoService,
                private tostr: ToastrService,
                private router: Router,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.cargoGroup = this.fb.group({
            'nombre' : ['', Validators.required],
            'descripcion' : ['', Validators.required]
        });
    }

    store() {
        this.cargoService.store(this.cargoGroup.value)
            .subscribe((cargo: any) => {
                this.tostr.success('<span class="now-ui-icons ui-1_bell-53"></span> Cargo registrado exitosamente.', '', {
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
