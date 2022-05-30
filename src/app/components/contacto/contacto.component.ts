import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Esto necesita estar declarado para el uso de modales de bootstrap
declare var window: any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  public person: any;
  formModal: any;

  constructor(private _router: Router) {
    this.person = {
      nombre: '',
      email: '',
      mensaje: ''
    };
   }

  ngOnInit(): void {

    // Guadar identificador del modal de bootstrap en variable
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('winModal')
    );
  }

  // Abrir modal de bootstrap
  openFormModal(): void {
    this.formModal.show();
  }

  // Cerrar modal de bootstrap
  saveSomeThing(): void {
    // confirm or save something
    this.formModal.hide();
  }

  goHome(): void{
    this._router.navigate(['/home']);
  }

  onSubmit(): void{
    // console.log(this.person);
    if(
      this.person.nombre != '' &&
      this.person.nombre &&
      this.person.nombre != null &&
      this.person.email != '' &&
      this.person.email &&
      this.person.email != null &&
      this.person.mensaje != '' &&
      this.person.mensaje &&
      this.person.mensaje != null
    ){
      this.openFormModal();
    }
  }

}
