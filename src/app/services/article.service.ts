import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";

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

    /**
     * Método para listar artículos
     * @param last:any = null - Decidir si limitar resultados o no
     * @returns 
     */
    getArticles(last:any = null):Observable<any>{

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', this.Authorization);

        let params = new HttpParams();

        params = params.append('select', 'id_article,titulo_article,imagen_article,contenido_article,meta_article,id_user,foto_user,name_user,lastname_user,id_category,name_category,status_article,date_created_article,date_updated_article');
        params = params.append('rel','articles,users,categories');
        params = params.append('type', 'article,user,category');

        if(last != null){
            params = params.append('orderBy','date_created_article');
            params = params.append('orderMode','ASC');
            params = params.append('startAt','0');
            params = params.append('endAt','3');
        }

        return this._http.get<any>(
            this.url+'relations/articles',
            {headers, params}
            
        ).pipe(
            catchError((error) => { 
                console.log('Error en ArticleService: ', error);

                return this.herrorHandler(error);
            })
        );
    }

    /**
     * Obtener un artículo en concreto por id
     * @param id_article 
     * @returns 
     */
    getArticle(id_article: number):Observable<any>{

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', this.Authorization);

        let params = new HttpParams();

        params = params.append('select', 'id_article,titulo_article,imagen_article,contenido_article,meta_article,id_user,foto_user,name_user,lastname_user,id_category,name_category,status_article,date_created_article,date_updated_article');
        params = params.append('rel','articles,users,categories');
        params = params.append('type', 'article,user,category');
        params = params.append('linkTo', 'id_article');
        params = params.append('equalTo', id_article);

        return this._http.get<any>(
            this.url+'relations/articles',
            {headers, params}
            
        ).pipe(
            catchError((error) => { 
                console.log('Error en ArticleService: ', error);

                return this.herrorHandler(error);
            })
        );
    }

    /**
     * Busqueda de artículo por terminos en los títulos
     * @param searchString 
     * @returns 
     */
    search(searchString: string):Observable<any>{

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', this.Authorization);

        let params = new HttpParams();

        params = params.append('select', 'id_article,titulo_article,imagen_article,contenido_article,meta_article,id_user,foto_user,name_user,lastname_user,id_category,name_category,status_article,date_created_article,date_updated_article');
        params = params.append('rel','articles,users,categories');
        params = params.append('type', 'article,user,category');
        params = params.append('linkTo', 'titulo_article');
        params = params.append('search', searchString);

        return this._http.get<any>(
            this.url+'relations/articles',
            {headers, params}
            
        ).pipe(
            catchError((error) => { 
                console.log('Error en ArticleService: ', error);

                return this.herrorHandler(error);
            })
        );
    }

    /**
     * Método para el control de errores
     * @param error 
     * @returns error
     */
    herrorHandler(error: HttpErrorResponse){
        if(error instanceof HttpErrorResponse){
            if(error.error instanceof ErrorEvent){
                console.log('ERROR DE CLIENTE');
            }else{
                console.log('ERROR DE SERVIDOR');
                console.log(error.status);
                console.log(error.message);
            }
        }else{
            console.log('OTRO TIPO DE ERROR');
        }
        return throwError(error);
    }
}