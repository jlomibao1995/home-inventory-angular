import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    authenticated: boolean = false;
    _url = 'http://localhost:8080/inventory/api/v1/authenticate';

    constructor(private _http: HttpClient) { }

    isAuthenticated (){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null){
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
                localStorage.setItem('currentUser', JSON.stringify(credentials));
                localStorage.setItem('email', credentials.email);
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

    logout(){
        localStorage.setItem('currentUser', null);
        localStorage.setItem('email', null);
        this.authenticated = false;
    }
}
