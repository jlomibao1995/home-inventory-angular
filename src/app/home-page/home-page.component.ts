import { User } from './../User';
import { LoginService } from './../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: User;

  constructor(private _router: Router, private route: ActivatedRoute, 
    private _http: HttpClient, private _loginService: LoginService) {
      // _http.get('http://localhost:8080/inventory/api/v1/user').subscribe( data => this.user = data);
     }

  ngOnInit(): void {
  }

  goToLogin() {
    this._router.navigate(['/login'], {relativeTo: this.route})
  }

  goToSignUp() {
    this._router.navigate(['/signup'], {relativeTo: this.route})
  }

  authenticated(){
    return this._loginService.authenticated;
  }
  

}
