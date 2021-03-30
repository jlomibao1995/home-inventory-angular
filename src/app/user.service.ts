import { User } from './User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = "http://localhost:8080/inventory/api/v1/user";

  constructor(private _http: HttpClient, private _cookieService: CookieService) { }

  getUser(){
    let email = this._cookieService.get('email');
    return this._http.get<User>(this._url + "/" + email);
  }

  createNewAccount(user){
    const headers = { 'content-type': 'application/json'};

    return this._http.post<any>(this._url, user, {'headers':headers})
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error);
  }

}
