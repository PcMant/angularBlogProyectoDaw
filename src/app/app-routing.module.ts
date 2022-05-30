// Importar los modulos del router de angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes a los cuales les quiero hacer una página exclusiva

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PoliticaDeCookiesComponent } from './components/politica-de-cookies/politica-de-cookies.component';
import { PoliticaDePrivacidadComponent } from './components/politica-de-privacidad/politica-de-privacidad.component';
import { AvisoLegalComponent } from './components/aviso-legal/aviso-legal.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';

import { ErrorComponent } from './components/error/error.component';

// Array de rutas
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/articulo/:id', component: ArticleComponent},
  {path: 'blog/crear', component: ArticleNewComponent},
  {path: 'blog/edit/:id', component: ArticleEditComponent},
  {path: 'acerca', component: AcercaComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'politica-de-cookies', component: PoliticaDeCookiesComponent},
  {path: 'politica-de-privacidad', component: PoliticaDePrivacidadComponent},
  {path: 'aviso-legal', component: AvisoLegalComponent},
  {path: 'search/:termino', component: SearchComponent},
  {path: 'login123', component: LoginComponent},

  // Muy importante que la ruta de error sea la última, de lo contrario no funcionaria el resto
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
