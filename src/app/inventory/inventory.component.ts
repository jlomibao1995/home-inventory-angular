import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemService } from './../item.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from "bootstrap"

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public itemForm: FormGroup;
  public editForm: FormGroup;
  public items: any;
  public message: String;
  public success: Boolean = false;
  public editMode: Boolean = false;
  public itemToDelete: any;
  private deleteModal: any;

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
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteItemModal'), {
      backdrop: true,
      keyboard: true,
      focus: true
    });

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

    this.editForm = this._fb.group({
      id: [0],
      itemName: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required]
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
      this.ngOnInit();
      this.success = true;
      this.message = 'Item added';
    },
      error => this.message = 'Item could not be added. ' + error.error.message);
  }

  deleteItem(){
    this._itemService.deleteItem(this.itemToDelete).subscribe(response => {
      this.ngOnInit();
      this.success = true;
      this.message = 'Item deleted';
    },
    error => this.message = 'Could not delete item. ' + error.error.message);
    this.deleteModal.hide();
  }

  onEdit(item:any){
    this.ngOnInit();
    this.editMode = true;

    this.editForm.patchValue({
      id: item.id,
      itemName: item.itemName,
      price: item.price,
      category:  item.category.categoryName
    });
  }

  saveChanges(){
    let id = this.editForm.get('id').value;
    let itemName = this.editForm.get('itemName').value;
    let price = this.editForm.get('price').value;

    this._itemService.updateItem(id, itemName, price)
    .subscribe(response => {
      this.ngOnInit();
      this.message = 'Item changes saved';
      this.success = true;
      this.editMode = false;

    }, error => this.message = 'Could not save changes. ' + error.error.message);
  }

  confirmDelete(itemId){
    this.itemToDelete = itemId;
    this.deleteModal.show();
    $("#deleteItemModal").appendTo("body");

  }
}
