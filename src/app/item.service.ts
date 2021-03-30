import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  _url = "http://localhost:8080/inventory/api/v1/item";

  constructor(private _http: HttpClient, private _cookieService: CookieService) { }

  getItems(){
    let email = this._cookieService.get('email');

    return this._http.get<any>(this._url + "/" + email)
    .pipe(catchError(this.errorHandler));
  }

  addItem(item) {
    const headers = { 'content-type': 'application/json' };

    return this._http.post<any>(this._url, item, { 'headers': headers })
      .pipe(catchError(this.errorHandler));
  }

  deleteItem(itemId){
    return this._http.delete<any>(this._url + "/" + itemId)
    .pipe(catchError(this.errorHandler));
  }

  updateItem(itemId, itemName, price){
    let params = new HttpParams()
    .set('itemName', itemName)
    .set('price', price);

    return this._http.put<any>(this._url + "/" + itemId, params)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
