import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this._router.navigate(['/login'], {relativeTo: this.route})
  }

  goToSignUp() {
    this._router.navigate(['/signup'], {relativeTo: this.route})
  }

}
