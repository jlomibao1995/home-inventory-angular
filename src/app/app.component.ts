import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'home-inventory';

  constructor(private _loginService: LoginService, private _http:HttpClient,
    private _router: Router){

    }

    logout(){
      this._loginService.logout();
      this._router.navigateByUrl("/");
    }

    authenticated(){
      return this._loginService.isAuthenticated();
    }
}
