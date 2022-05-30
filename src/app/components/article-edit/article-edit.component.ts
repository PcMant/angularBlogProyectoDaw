import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public is_edit: boolean = false;
  public page_title: string;
  
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.article = new ArticleNew(null, 1, null, null, null, 1, null, 1);
    this.sesion = JSON.parse(this.sesion);
    this.page_title = 'Editar artículo';
   }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {

    this._route.params.subscribe(params => {
      let id = params['id'];

      // console.log(this._articleService.prueba());

      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.result){
            this.article = response.result[0];
          }
          // console.log(response);
        },
        error => {
          console.log(`Este es el error: ${error}`);
          this._router.navigate(['/error']);
        }
      );
    });

  }

  onSubmit(){
    // this.article.id_article = Number(this.article.id_article);
    // console.log(typeof this.article.id_article);
    this._articleService.update(
      this.article.id_article,
      this.sesion[0].token_user,
      this.sesion[0].id_user,
      this.article.titulo_article,
      this.article.imagen_article,
      this.article.contenido_article
    ).subscribe(
      response => {
        if(response.status == '200'){
          this.status = '200';
          // console.log(response);
          this._router.navigate(['/blog/articulo', this.article.id_article]);
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
