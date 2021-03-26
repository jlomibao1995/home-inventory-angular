import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = "http://localhost:8080/inventory/api/v1/user";

  constructor(private _http: HttpClient) { }

  getUser(email){
    let requestResource = this._url + "/"+ email;
    return this._http.get<User>(requestResource, email);
  }
}
