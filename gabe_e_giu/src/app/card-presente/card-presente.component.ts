import { Component, OnInit, Input, NgModule } from '@angular/core'
import { product } from '@models/product.model'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-card-presente',
  imports: [CommonModule, FormsModule],
  templateUrl: './card-presente.component.html',
  styleUrl: './card-presente.component.css'
})

export class CardPresenteComponent {
  @Input() product: product = {
    photo_path: "",
    name: "",
    description: "",
    price_cents: 99999,
    category: "",
    type: "",
  }

  quantity: number = 1
  added_to_cart: boolean = false
  selecting_quantity: boolean = false

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
    this.selecting_quantity = false
    this.added_to_cart = true
    setTimeout(()=>{
      this.added_to_cart = false
    }, 1000)
  }

}
