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

    getArticles(last:any = null):Observable<any>{

        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'AtWV3mYpVNrQvKdD4gWvjbF2imGLQh');

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