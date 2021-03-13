import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public items = [
    {id: 1, category: 1, itemName: "blender", price: 29.99, owner: "cprg352+anne@gmail.com"},
    {id: 1, category: 1, itemName: "blender", price: 29.99, owner: "cprg352+anne@gmail.com"},
    {id: 1, category: 1, itemName: "blender", price: 29.99, owner: "cprg352+anne@gmail.com"},
    {id: 1, category: 1, itemName: "blender", price: 29.99, owner: "cprg352+anne@gmail.com"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
