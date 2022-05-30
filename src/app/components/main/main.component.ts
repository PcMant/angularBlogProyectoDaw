import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

// Importación del servicio de articulos para poder usarlo
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ArticleService]
})
export class MainComponent implements OnInit {

  @Input() logueado: boolean = false;
  public subscriber: Subscription = new Subscription;
  public routaArticuloCheck: any =  this._router.url.match(/\/blog\/articulo\/[0-9]+/);
  public sesion: any = localStorage.getItem('sesion');
  public id: number = 0;
      

  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    private _articleService: ArticleService
  ) {
    // Obtener parámetros de URL
    this._route.params.subscribe(params => {
      this.id = params['id'];    
    });
  }

  ngOnInit(): void {

    this.sesion = JSON.parse(this.sesion);
    // console.log(this.sesion);

    // Evento que detecta cambios en la ruta
    this.subscriber = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.routaArticuloCheck =  this._router.url.match(/^\/blog\/articulo\/[0-9]+$/);
    });
  
  }

  btnEdit(): void {
    let ruta: any = this._router.url;
    ruta = ruta.split('/');

    this._router.navigate([`/blog/edit/${ruta[3]}`]);
  }

  delete(): void{

    let ruta: any = this._router.url;
    ruta = ruta.split('/');

    this._articleService.delete(this.sesion[0].token_user,Number(ruta[3])).subscribe(
      response => {
        // console.log(response);
        this._router.navigate(['/blog']);
      },
      error => {
        console.log(error);
      }
    );
  }

  //En el onDestroy, valido si mi subscriber sigue activo y me desuscribo, si no seguirá activo escuchando cuando navegues a otro componente donde no lo requieras.
  ngOnDestroy () {
    this.subscriber?.unsubscribe();
  }
}
