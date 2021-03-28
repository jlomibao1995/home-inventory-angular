import { UserService } from './../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { passwordValidator } from '../helpers/password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  message: String;
  created = false;

  constructor(private fb: FormBuilder, private _router: Router, 
    private _userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [''],
      name: ['', Validators.required]
    }, { validator: passwordValidator })
  }

  goToLogin(){
    this._router.navigateByUrl('/login');
  }

  createAccount(){
    let user = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      name: this.signupForm.get('name').value,
      active: true,
      role: {
        id: 2,
        roleName: 'Regular User'
      }
    };

    this._userService.createNewAccount(user).subscribe(response => {
      this.message = 'Account created';
      this.created = true;
    },
    error => this.message = error.error.message);
  }

}
