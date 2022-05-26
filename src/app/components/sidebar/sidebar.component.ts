import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public logueado: boolean = false;
  @Input() public sesion: any;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    location.replace('/home');
  }

}
