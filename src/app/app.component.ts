import { Component } from '@angular/core';

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


}
