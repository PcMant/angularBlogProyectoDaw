import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() logueado: boolean = false;
  public subscriber: Subscription = new Subscription;
  public routaArticuloCheck: any =  this._router.url.match(/\/blog\/articulo\/[0-9]+/);

  constructor(
    public _router: Router
  ) { }

  ngOnInit(): void {

    // Evento que detecta cambios en la ruta
    this.subscriber = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.routaArticuloCheck =  this._router.url.match(/^\/blog\/articulo\/[0-9]+$/);
    });
  }

  delete(id: string): void{
    console.log(id);
    // this._articleService.delete(id).subscribe(
    //   response => {
    //     this._router.navigate(['blog']);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  //En el onDestroy, valido si mi subscriber sigue activo y me desuscribo, si no seguirá activo escuchando cuando navegues a otro componente donde no lo requieras.
  ngOnDestroy () {
    this.subscriber?.unsubscribe();
  }
}
