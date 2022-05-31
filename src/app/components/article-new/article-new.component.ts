import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleNew } from 'src/app/models/articleNew';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: ArticleNew;
  public sesion: any = localStorage.getItem('sesion');
  public status: string = '';
  public page_title: string;
  
  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) {
    this.article = new ArticleNew(null, 1, null, null, null, 1, null, 1);
    this.sesion = JSON.parse(this.sesion);
    this.page_title = 'Crear artículo';
   }

  ngOnInit(): void {
  }

  onSubmit(){
    // console.log(this.article);
    // Crear artículo nuevo
    this._articleService.create(
      this.sesion[0].token_user,
      this.sesion[0].id_user,
      this.article.titulo_article,
      this.article.imagen_article,
      this.article.contenido_article
    ).subscribe(
      response => {
        if(response.status == '200'){
          this.status = '200';
          this.article = response.article;
          console.log(response);
          this._router.navigate(['/blog']);
        }else{
          this.status = 'error';
        }
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
