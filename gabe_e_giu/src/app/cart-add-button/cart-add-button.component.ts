import { CartService } from '@services/cart.service'
import { Component, input, Input, OnInit } from '@angular/core'
import { product } from '@models/product.model'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { CartProductInterface } from '@models/cart.model'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-cart-add-button',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './cart-add-button.component.html',
  styleUrl: './cart-add-button.component.css'
})
export class CartAddButtonComponent implements OnInit {
  constructor(private cart: CartService){}
  quantity: number = 1
  added_to_cart: boolean = false
  selecting_quantity: boolean = false
  
  @Input() product: product = {
    id: 1,
    photo_path: "",
    name: "",
    description: "",
    price_cents: 99999,
    category: "",
    type: "",
  }

  @Input() editMode: boolean = false

  edit_object: CartProductInterface = {
    id: 1,
    photo_path: "",
    name: "",
    description: "",
    price_cents: 99999,
    category: "",
    type: "",
    quantity: 1,
    total_cents: 99999
  }

  ngOnInit(): void {
    if(this.editMode){
      this.edit_object = this.cart.getItemById(this.product.id)
    }

    this.quantity = this.edit_object.quantity
  }

  toggle_quantity_select() {
    this.selecting_quantity = !this.selecting_quantity
  }

  decrease_quantity() {
    if(this.quantity > 1) {
      this.quantity --
    }
  }

  increase_quantity() {
    this.quantity ++
  }

  add_to_cart() {
    if(!this.selecting_quantity){
      this.selecting_quantity = true
      return
    }
    if(!this.editMode){
      this.selecting_quantity = false
      this.cart.addItem(this.product, this.quantity)
      this.quantity = 1
    }
    else {
      this.cart.updateQuantity(this.product, this.quantity)
    }

    this.added_to_cart = true
    setTimeout(()=>{
      this.added_to_cart = false
    }, 1000)
  }
}
