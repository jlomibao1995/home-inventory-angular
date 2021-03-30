import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    authenticated: boolean = false;
    _url = 'http://localhost:8080/inventory/api/v1/authenticate';

    constructor(private _http: HttpClient, private _cookieService: CookieService) { }

    isAuthenticated (){
        let currentUser = this._cookieService.get('currentUser');
        if (currentUser){
            return true;
        }
        return false;
    }

    authenticate(credentials, callback) {

        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        } : {});

        this._http.get(this._url, { headers: headers }).subscribe(response => {
            if (response['name']) {
                console.log(response);
                this.authenticated = true;
                credentials.authdata = window.btoa(credentials.email + ':' + credentials.password);
                this._cookieService.set('currentUser', JSON.stringify(credentials), 1);
                this._cookieService.set('email', credentials.email, 1);
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

    logout(){
        this._cookieService.deleteAll();
        this.authenticated = false;
    }
}
