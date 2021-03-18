import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated:boolean = false;
  _url = 'http://localhost:8080/"inventory/api/vi/login"';

  constructor(private _http: HttpClient) { }

  authenticate(email: String, password: String){
    this._http.post<Observable<boolean>>(this._url, {
      email: email,
      password: password
  }).subscribe(isValid => {
      if (isValid) {
          sessionStorage.setItem(
            'token',
            btoa(email + ':' + password)
          );
          this.authenticated = true;
      } else {
          alert("Authentication failed.");
      }
  });
  }
}
