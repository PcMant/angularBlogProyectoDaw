import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PoliticaDeCookiesComponent } from './components/politica-de-cookies/politica-de-cookies.component';
import { PoliticaDePrivacidadComponent } from './components/politica-de-privacidad/politica-de-privacidad.component';
import { AvisoLegalComponent } from './components/aviso-legal/aviso-legal.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    NavComponent,
    FooterComponent,
    MainComponent,
    ErrorComponent,
    HomeComponent,
    BlogComponent,
    AcercaComponent,
    ContactoComponent,
    PoliticaDeCookiesComponent,
    PoliticaDePrivacidadComponent,
    AvisoLegalComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
