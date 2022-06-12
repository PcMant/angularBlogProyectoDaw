import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

// Importación del servicio de articulos para poder usarlo
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angularBlogProyectoDaw';
  public logueado: boolean = false;
  public routaArticuloCheck: any =  this._router.url.match(/\/blog\/articulo\/[0-9]+/);
  public ariculoEdit: any =  this._router.url.match(/^\/blog\/crear\/?.*$/);
  public subscriber: Subscription = new Subscription;
  public sesion: any;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(){

    let sesion: any = localStorage.getItem('sesion');
      sesion = JSON.parse(sesion);

    // Acciones y comprobaciones relativas a la sesión que saltan por cada cambio de ruta
    this.subscriber = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      // console.log(this._router.url);
      let sesion: any = localStorage.getItem('sesion');
      sesion = JSON.parse(sesion);
  
      this.routaArticuloCheck =  this._router.url.match(/^\/blog\/articulo\/[0-9]+$/);
      this.ariculoEdit =  this._router.url.match(/^\/blog\/crear\/?.*$/);
  
      if(sesion != null){
        this._loginService.getLoginInfo(sesion[0].token_user).subscribe(
          response => {

            this.ariculoEdit =  this._router.url.match(/^\/blog\/crear\/?.*$/);

            // comprobar vigencia del token
            if (this.jwtHelper.isTokenExpired(sesion[0].token_user)) {
              // token expired 
              this.logueado = false;
              localStorage.removeItem('sesion');
            } else {
              // token valid
              this.logueado = true;
            }

            if(this._router.url == '/login123' && this.logueado) this._router.navigate(['/home']);
          },
          error => {
            console.log('La sesión ya no es valida y ha sido cerrada.');
            console.log(`Este es el error: ${error}`);
            localStorage.removeItem('sesion');
            this.logueado = false;
            if(this._router.url.match(/^\/blog\/crear\/?.*$/) != null) this._router.navigate(['/home']);
          }
        );
      }else{
        this.logueado = false;
        if(this._router.url.match(/^\/blog\/crear\/?.*$/) != null) this._router.navigate(['/home']);
      }
      // console.log(this.logueado);
      this.sesion = sesion;
    });
  }

  ngOnDestroy () {

    // Pos si acaso y para evitar que se duplique en caso de cerrarse el componente, lo eliminamos el objeto
    this.subscriber?.unsubscribe();
 }
}
