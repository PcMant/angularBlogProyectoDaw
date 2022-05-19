import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  public person: any;

  constructor() {
    this.person = {
      nombre: '',
      email: '',
      mensaje: ''
    };
   }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.person);
  }

}
