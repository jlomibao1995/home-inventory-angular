import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemService } from './../item.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public itemForm: FormGroup;
  public items: any;
  public message: String;
  public success: Boolean = false;

  constructor(private _fb: FormBuilder, private _itemService: ItemService, 
    private _router: Router, private _cookieService: CookieService,
    private _route: ActivatedRoute) { }

  get itemName() {
    return this.itemForm.get('itemName');
  }

  get price() {
    return this.itemForm.get('price');
  }

  get category() {
    return this.itemForm.get('category');
  }

  ngOnInit(): void {
    this._itemService.getItems().subscribe(data => {
      this.success = true;
      this.items = data
    },
      error => this.message = 'Could not retrieve items<br>' + error.error.message);

    this.itemForm = this._fb.group({
      itemName: ['item', Validators.required],
      price: [5.99, Validators.required],
      category: ['Bed Room', Validators.required]
    });

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.message = params.get('status');
    });
  }

  addItem() {
    let newItem = {
      itemName: this.itemName.value,
      price: this.price.value,
      category: {
        categoryName: this.category.value
      },
      user: {
        email: this._cookieService.get('email')
      }
    }

    this._itemService.addItem(newItem).subscribe(response => {
      this.success = true;
      this.message = 'Item added'
    },
      error => this.message = 'Item could not be added. ' + error.error.message);

    this.ngOnInit();
    this._itemService.getItems().subscribe(data => this.items = data,
      error => this.message = 'Could not retrieve items. ' + error.error.message);
  }

  deleteItem(itemId){
    this._itemService.deleteItem(itemId).subscribe(response => {
      this.success = true;
      this.message = 'Item deleted';

      this._itemService.getItems().subscribe(data => this.items = data,
        error => this.message = 'Could not retrieve items. ' + error.error.message);

    },
    error => this.message = 'Could not delete item. ' + error.error.message);
  }
}
