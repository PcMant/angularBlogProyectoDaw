import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Service Article
import { Article } from '../models/article';

// Configuraciones globales para la API
import { Global } from './global';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public url: string = '';
  public Authorization: string = '';

  constructor(private _http: HttpClient) {
    this.url = Global.url;
    this.Authorization = Global.Authorization;
  }

  postLogin(email_user: string, password_user: string): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', this.Authorization);

    let params = new HttpParams();

    params = params.append('email_user', email_user);
    params = params.append('password_user', password_user);

    return this._http
      .post<any>(this.url + 'users?login=true&suffix=user', { headers, params, body: {"parametro1": "hola"}})
      .pipe(
        catchError((error) => {
          console.log('Error en LoginService: ', error);

          return this.herrorHandler(error);
        })
      );
  }

  getLoginInfo(token_user: string): Observable<any>{

    let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', this.Authorization);

        let params = new HttpParams();

        params = params.append('select', '*');
        params = params.append('linkTo', 'token_user');
        params = params.append('equalTo', token_user);

        return this._http.get<any>(
            this.url+'users',
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
  herrorHandler(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.log('ERROR DE CLIENTE');
      } else {
        console.log('ERROR DE SERVIDOR');
        console.log(error.status);
        console.log(error.message);
      }
    } else {
      console.log('OTRO TIPO DE ERROR');
    }
    return throwError(error);
  }
}
