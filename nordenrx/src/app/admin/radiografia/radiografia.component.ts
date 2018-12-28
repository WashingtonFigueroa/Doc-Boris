import { Component, OnInit } from '@angular/core';
import {RadiografiaService} from './radiografia.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-radiografia',
  templateUrl: './radiografia.component.html',
  styleUrls: ['./radiografia.component.css']
})
export class RadiografiaComponent implements OnInit {

  radiografias: any;
  img = environment.base + 'radiografia/';
  constructor(private radiografiaService: RadiografiaService) {
    this.radiografiaService.noAsignadas()
      .subscribe((res: any) => {
        this.radiografias = res;
      });
  }

  ngOnInit() {
  }

}
