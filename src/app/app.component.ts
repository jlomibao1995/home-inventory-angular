import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'home-inventory';

  constructor(private _loginService: LoginService, private _http:HttpClient,
    private _router: Router){

    }

    // logout(){
    //   this._http.post<any>('logout', {}).finally(() => {
    //     this._loginService.authenticated = false;
    //     this._router.navigateByUrl('/login');
    //   }).subscribe();
    // }
}
