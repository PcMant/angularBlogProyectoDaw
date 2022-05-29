import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleNew } from 'src/app/models/articleNew';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['../article-new/article-new.component.scss'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: ArticleNew;
  public sesion: any = localStorage.getItem('sesion');
  public status: string = '';
  
  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) {
    this.article = new ArticleNew(null, 1, null, null, null, 1, null, 1);
    this.sesion = JSON.parse(this.sesion);
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.article);
    this._articleService.create(
      this.sesion[0].token_user,
      this.sesion[0].id_user,
      this.article.titulo_article,
      this.article.contenido_article,
      this.article.imagen_article
    ).subscribe(
      response => {
        if(response.status == '200'){
          this.status = '200';
          this.article = response.article;
          // console.log(response);
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
