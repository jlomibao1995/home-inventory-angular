import { User } from './../User';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public user: any;
  public errorMsg: any;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    let email = localStorage.getItem('email');
    this._userService.getUser(email).subscribe(data => this.user = data,
      error => this.errorMsg = error);
  }

}
