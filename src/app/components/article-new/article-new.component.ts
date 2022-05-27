import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleEdit } from 'src/app/models/articleEdit';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  public article: ArticleEdit;
  
  constructor() {
    this.article = new ArticleEdit(null, 1, null, null, null, 1, null, 1);
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.article);
  }

}
