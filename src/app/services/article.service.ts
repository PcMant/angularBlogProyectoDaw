import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from "rxjs";

// Service Article
import { Article } from "../models/article";

// Configuraciones globales para la API
import { Global } from "./global";

@Injectable()
export class ArticleService {

    public url: string = '';
    public Authorization: string = '';

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this.Authorization = Global.Authorization;
    }

    prueba(): string {
        return 'Prueba del servicio de  Articles!!! ESTO SIGNIFICA QUE FUNCIONA';
    }

    getArticles():Observable<any>{

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'AtWV3mYpVNrQvKdD4gWvjbF2imGLQh');

        let params = new HttpParams();

        params = params.append('select', 'id_article,titulo_article,imagen_article,contenido_article,meta_article,id_user,foto_user,name_user,lastname_user,id_category,name_category,status_article,date_created_article,date_updated_article');
        params = params.append('rel','articles,users,categories');
        params = params.append('type', 'article,user,category');

        return this._http.get(
            this.url+'relations/articles',
            {headers, params}
            
        ).pipe(
            catchError(error => error)
        );
    }
}