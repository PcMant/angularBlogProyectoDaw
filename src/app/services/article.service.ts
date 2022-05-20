import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

// Service Article
import { Article } from "../models/article";

// Configuraciones globales para la API
import { Global } from "./global";

@Injectable()
export class ArticleService {

    public url: string = '';

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    prueba(): string {
        return 'Prueba del servicio de  Articles!!! ESTO SIGNIFICA QUE FUNCIONA';
    }

    getArticles():Observable<any>{
        return this._http.get(this.url+'articles');
    }
}