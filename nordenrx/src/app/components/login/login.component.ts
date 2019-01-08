import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginGroup: FormGroup;
  constructor(protected fb: FormBuilder,
              protected loginService: LoginService,
              protected route: ActivatedRoute,
              protected toastr: ToastrService,
              protected router: Router) {
      this.createForm();
  }

  ngOnInit() { }

    createForm() {
        this.loginGroup = this.fb.group({
            'email' : new FormControl('',[Validators.required, Validators.email]),
            'password' : new FormControl('',[Validators.required, Validators.minLength(5)])
        });
    }

  login() {
        this.loginService.login(this.loginGroup.value)
            .subscribe((res: any) => {
                if (res.autenticado) {
                    this.toastr.success('Ingresando al sistema');
                    console.log('sistema');
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['contactos']);
                }
            }, (error) => {
                this.toastr.error('Credenciales invalidas', 'Error de autenticacion');
                console.log('error');
                this.loginGroup.reset();
            });
    }

}
