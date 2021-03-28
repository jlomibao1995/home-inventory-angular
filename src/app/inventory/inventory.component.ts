import { Router } from '@angular/router';
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
  public errorMsg: any;
  private successMessg: String;

  constructor(private _fb: FormBuilder, private _itemService: ItemService, 
    private _router: Router) { }

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
    let email = localStorage.getItem('email');
    this._itemService.getItems(email).subscribe(data => this.items = data,
      error => this.errorMsg = error);

    this.itemForm = this._fb.group({
      itemName: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
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
        email: localStorage.getItem('email')
      }
    }

    this._itemService.addItem(newItem).subscribe(response => console.log(response),
      error => this.errorMsg = error.error.message);

      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/inventory']);
    }); 
  }
}
