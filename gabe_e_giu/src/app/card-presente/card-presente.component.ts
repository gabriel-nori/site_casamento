import { Component, OnInit, Input } from '@angular/core';
import { product } from '@models/product.model'

@Component({
  selector: 'app-card-presente',
  imports: [],
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
}
