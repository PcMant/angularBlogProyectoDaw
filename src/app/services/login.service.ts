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

  login(email_user: string, password_user: string): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', this.Authorization);

    let params = new HttpParams();

    params = params.append('login', 'true');
    params = params.append('suffix', 'user');

    return this._http
      .put<any>(this.url + 'relations/articles', { headers, params })
      .pipe(
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
