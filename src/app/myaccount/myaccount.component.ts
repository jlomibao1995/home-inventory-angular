import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './../login.service';
import { UserService } from './../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { passwordValidator } from '../helpers/password.validator';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  public accountForm: FormGroup;
  public user: any;
  public message: String;
  public editMode = false;
  public success = false;

  constructor(private _fb: FormBuilder, private _userService: UserService,
    private _loginService: LoginService, private _cookieService: CookieService) { }

  ngOnInit(): void {
    //get user details
    this.editMode = false;
    this._userService.getUser().subscribe(data => {
      this.user = data;
    }, error => this.message = error.error.message);

    //initialize form
    this.accountForm = this._fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator })
  }

  onEditMode(){
    this.editMode = true;
    this.accountForm.patchValue({
      name: this.user.name,
      email: this.user.email
    });
  }

  passwordRequired(){
    if (!this.accountForm.getError('mismatch')){
      this.accountForm.get('password').setValidators(Validators.required);
      this.accountForm.get('confirmPassword').setValidators(Validators.required);
    } else {
      this.accountForm.get('password').clearValidators();
      this.accountForm.get('confirmPassword').clearValidators();
    }
  }

  saveChanges(){
    let name = this.accountForm.get('name').value;
    let email = this.accountForm.get('email').value;
    let password = this.accountForm.get('password').value;
    let userId = this.user.id;

    this._userService.updateAccount(userId, name, email, password).subscribe(response =>
      {
        let credentials = JSON.parse(this._cookieService.get('currentUser'));
        
        if (password == null || password == ''){
          password = credentials.password;
        } 

        let newCredentials: any = {'email': email, 'password': password};
        this._cookieService.deleteAll();
        //this._loginService.authenticate(newCredentials, this.ngOnInit());

        newCredentials.authdata = window.btoa(newCredentials.email + ':' + newCredentials.password);
                this._cookieService.set('currentUser', JSON.stringify(newCredentials), 1);
                this._cookieService.set('email', newCredentials.email, 1);

        this.ngOnInit();

        this.success = true;
        this.message = 'Account changes saved'
      }, error => this.message = 'Could not update account. ' + error.error.message);
  }

}
