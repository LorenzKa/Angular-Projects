import { Component } from '@angular/core';

interface availableProduct {
  id: number;
  name: string;
  price: number;
}
interface cartProduct {
  id: number;
  name: string;
  price: number;
  amount: number;
}
const reducer = (previousValue: number, currentValue: number) =>
  previousValue + currentValue;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shopping List';

  availableProducts: availableProduct[] = [
    { id: 0, name: 'Brot', price: 1.2 },
    { id: 1, name: 'Milch', price: 0.9 },
    { id: 2, name: 'Zucker', price: 1.5 },
  ];
  shoppingList: cartProduct[] = [];
  addingProduct = false;
  newProductName = '';
  newProductPrice = 9.99;
  amountAddToCart = 1;
  productIdAddToCart = 0;
  itemToDelete = 0;
  totalCost = 0;
  budget = 10;
  addProduct(): void {
    this.addingProduct = true;
  }
  closeProductAdding(): void {
    this.addingProduct = false;
  }
  addProductToAvailableProducts(): void {
    this.availableProducts.push({
      id: this.availableProducts.length,
      name: this.newProductName,
      price: this.newProductPrice,
    });
    this.closeProductAdding();
  }
  addProductToCart(): void {
    this.shoppingList.push({
      id: this.shoppingList.length,
      name: this.availableProducts[this.productIdAddToCart].name,
      price:
        this.availableProducts[this.productIdAddToCart].price *
        this.amountAddToCart,
      amount: this.amountAddToCart,
    });
    this.calculateSum();
  }
  deleteItem(id: number): void {
    this.shoppingList = this.shoppingList.filter((x) => x.id != id);
    this.calculateSum();
  }
  calculateSum(): void {
    if (this.shoppingList.length > 0) {
      this.totalCost = this.shoppingList.map((x) => x.price).reduce(reducer);
    } else {
      this.totalCost = 0;
    }
  }
}
