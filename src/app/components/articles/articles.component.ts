import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';
import { Global } from '../../services/global';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public url: string = '';

  @Input() articles: Article[] = [];

  constructor() { 
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
