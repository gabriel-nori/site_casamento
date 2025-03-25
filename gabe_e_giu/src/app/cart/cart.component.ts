import { cartInterface, CartProductInterface } from '@models/cart.model';
import { CartService } from '@services/cart.service'
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { product } from '@models/product.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private cart: CartService){
    this.cart_data = this.cart.get()
  }

  protected cart_items: CartProductInterface[] = []
  protected cart_data: cartInterface = {total: 0, item_count: 0, items: {}}

  ngOnInit() {
    for (const key in this.cart_data.items) {
      this.cart_items.push(this.cart_data.items[key])
    }
  }
}
