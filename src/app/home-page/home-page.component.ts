import { User } from './../User';
import { LoginService } from './../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: any;
  public errorMsg: any;

  constructor(private _router: Router, private route: ActivatedRoute, 
    private _http: HttpClient, private _loginService: LoginService,
    private _userService: UserService) {
     }

  ngOnInit(): void {
    let email = localStorage.getItem('email');
    this._userService.getUser(email).subscribe(data => this.user = data,
      error => this.errorMsg = error);
  }

  authenticated(){
    return this._loginService.isAuthenticated();
  }

  goToLogin() {
    this._router.navigate(['/login'], {relativeTo: this.route})
  }

  goToSignUp() {
    this._router.navigate(['/signup'], {relativeTo: this.route})
  }
  
  goToInventory() {
    this._router.navigate(['/inventory'], {relativeTo: this.route})
  }

  goToMyAccount() {
    this._router.navigate(['/myaccount'], {relativeTo: this.route})
  }

}
