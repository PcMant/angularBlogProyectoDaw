import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importación del servicio de articulos para poder usarlo
import { ArticleService } from '../../services/article.service';

// Importando del modelo Articles
import { Article } from '../../models/article'

import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  public articles: Article[] = [];
  public termino: string = '';
  public url: string = '';

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      this.termino = params['termino'];
      let termino = params['termino'];

      // console.log(this._articleService.prueba());

      this._articleService.search(termino).subscribe(
        response => {
          if(response.result){
            this.articles = response.result;
          }
        },
        error => {
          console.log(`Este es el error: ${error}`);
          this.articles = [];
        }
      );
    });

  }

}
