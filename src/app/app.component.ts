import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shopping List';
  availableProducts = [{name: "Brot", price: 1.20},{name: "Milch", price: 0.90},{name: "Zucker", price: 1.50}];
  shoppingList = [];
  addingProduct = false;
  addProduct() : void{
    this.addingProduct = true
  }
  addedProduct() : void {
    this.addingProduct = false
  }
}
