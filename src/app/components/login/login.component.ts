import { Component, OnInit } from '@angular/core';

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

  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {

    this._loginService.login('juan77@','1234').subscribe(
      response => {
        if(response.result){
          this.credencials = response.result;
        }
        console.log(response)
      },
      error => {
        console.log(`Este es el error: ${error}`);
      }
    );

  }

}
