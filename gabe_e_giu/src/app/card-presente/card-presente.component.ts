import { CartAddButtonComponent } from '../cart-add-button/cart-add-button.component'
import { Component, Input } from '@angular/core'
import { product } from '@models/product.model'

@Component({
  selector: 'app-card-presente',
  imports: [CartAddButtonComponent],
  templateUrl: './card-presente.component.html',
  styleUrl: './card-presente.component.css'
})

export class CardPresenteComponent {
  @Input() product: product = {
    id: 1,
    photo_path: "",
    name: "",
    description: "",
    price_cents: 99999,
    category: "",
    type: "",
  }

}
