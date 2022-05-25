import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';

// Importación del servicio de articulos para poder usarlo
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public credencials: any[] = [];
  public invalid: boolean = false;
  public cuenta: any;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) { 
    this.cuenta = {
      email: '',
      password: ''
    }
  }
  

  ngOnInit(): void {

    // this._loginService.login('juan','12345').subscribe(
    //   response => {
    //     if(response.result){
    //       this.credencials = response.result;
    //       console.log(this.credencials);
    //       localStorage.setItem('sesion',JSON.stringify(this.credencials));
    //     }
    //     // console.log(response);
    //     this.invalid = false;
    //     this._router.navigate(['/home']);
    //   },
    //   error => {
    //     console.log('Usuario o la contraseña introduccidos son incorrectas.');
    //     console.log(`Este es el error: ${error}`);
    //     this.invalid = true;
    //   }
    // );

  }

  onSubmit(): void{

    this._loginService.login(this.cuenta.email,this.cuenta.password).subscribe(
      response => {
        if(response.result){
          this.credencials = response.result;
          console.log(this.credencials);
          localStorage.setItem('sesion',JSON.stringify(this.credencials));
        }
        // console.log(response);
        this.invalid = false;
        this._router.navigate(['/home']);
      },
      error => {
        console.log('Usuario o la contraseña introduccidos son incorrectas.');
        console.log(`Este es el error: ${error}`);
        this.invalid = true;
      }
    );

  }

}
