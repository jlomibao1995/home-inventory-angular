import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  _url = "http://localhost:8080/inventory/api/v1/item";

  constructor(private _http: HttpClient) { }

  getItems(email){
    let requestResource = this._url + "/"+ email;

    const headers = { 'content-type': 'application/json' };
    return this._http.get<any>(requestResource, email)
    .pipe(catchError(this.errorHandler));
  }

  addItem(item) {
    const headers = { 'content-type': 'application/json' };

    return this._http.post<any>(this._url, item, { 'headers': headers })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
