import { Component, OnInit } from '@angular/core';

// Importación del servicio de articulos para poder usarlo
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  constructor(
    private _articleService: ArticleService
  ) { }

  ngOnInit(): void {
    console.log(this._articleService.prueba());
    
    this._articleService.getArticles().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
