import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importación del servicio de articulos para poder usarlo
import { ArticleService } from '../../services/article.service';

// Importando del modelo Articles
import { Article } from '../../models/article'

import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article = {
    id_article: 0,
    titulo_article: '',
    imagen_article: '',
    contenido_article: '',
    meta_article: '',
    id_user: 0,
    foto_user: '',
    name_user: '',
    lastname_user: '',
    id_category: 0,
    name_category: '',
    status_article: 0,
    date_created_article: undefined,
    date_updated_article: undefined,
    pruebas: function (): string {
      throw new Error('Function not implemented.');
    }
  };
  
  public url: string = '';
  
  @Input() public login: boolean = false;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      let id = params['id'];

      console.log(this._articleService.prueba());

      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.result){
            this.article = response.result[0];
          }
          console.log(response);
        },
        error => {
          console.log(`Este es el error: ${error}`);
          this._router.navigate(['/error']);
        }
      );
    })
  }

}
