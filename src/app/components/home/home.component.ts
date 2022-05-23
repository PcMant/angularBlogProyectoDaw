import { Component, OnInit } from '@angular/core';

// Importación del servicio de articulos para poder usarlo
import { ArticleService } from '../../services/article.service';

// Importando del modelo Articles
import { Article } from '../../models/article'

import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public articles: Article[] = [];
  public url: string = '';

  constructor(
    private _articleService: ArticleService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {

    this._articleService.getArticles(true).subscribe(
      response => {
        if(response.result){
          this.articles = response.result;
        }
        console.log(response)
      },
      error => {
        console.log(`Este es el error: ${error}`);
      }
    );
  }

}
