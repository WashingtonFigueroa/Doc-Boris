import { Component, OnInit } from '@angular/core';
import {CargoService} from '../cargo.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cargo-index',
  templateUrl: './cargo-index.component.html',
  styleUrls: ['./cargo-index.component.scss']
})
export class CargoIndexComponent implements OnInit {

    cargos: any[] = null;
    loading = false;
    constructor(private cargoService: CargoService,
                private toastr: ToastrService) {
        this.loading = true;
        this.cargoService.index()
            .subscribe((res: any[]) => {
                this.cargos = res;
                this.loading = false;
                console.log(res);
            });
    }

    ngOnInit() {
    }

    destroy(cargo: any, index: number) {
        if (confirm(`Esta seguro de eliminar el cargo ${cargo.nombre}?`)) {
            this.cargoService.destroy(cargo.cargo_id)
                .subscribe((res: any) => {
                    this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> Cargo ${res.nombre} eliminado exitosamente`, '', {
                        timeOut: 8000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon",
                        positionClass: 'toast-top-right'
                    });
                    this.cargos.splice(index, 1);
                });
        }
    }
}
