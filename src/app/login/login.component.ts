import { LoginService } from './../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _router: Router, private route: ActivatedRoute,
     private fb: FormBuilder, private _loginService: LoginService ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  goToSignUp() {
    this._router.navigate(['/signup'], {relativeTo: this.route})
  }

  login() {
    this._loginService.authenticate({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }, () => this._router.navigateByUrl('/'));
  }

}
