import { Component, OnInit } from '@angular/core';
import { OrderKey, product, ProductFilter } from '@models/product.model';
import { ProductService } from '@services/product.service'
import { CardPresenteComponent } from '../card-presente/card-presente.component';
import { CommonModule } from '@angular/common';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { MenuComponent } from '../menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartService } from '@services/cart.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MenuConfig } from '@models/menu.model';

@Component({
  selector: 'app-presentes',
  imports: [
    CommonModule,
    CardPresenteComponent,
    FilterSearchComponent,
    MenuComponent,
    MatIconModule,
    RouterModule,
    SpinnerComponent
  ],
  templateUrl: './presentes.component.html',
  styleUrl: './presentes.component.css'
})
export class PresentesComponent implements OnInit{
  logo_properties: MenuConfig = {
    color: 'marsala',
    background_color: "#f6b1ca",
    hamburger_color: "#440f21"
  }

  private cart: CartService = new CartService()
  product_service: ProductService = new ProductService()
  products: product[] = []
  has_items: boolean = false
  filter_options: OrderKey = this.cart.getOrderingKeys()
  loading: boolean = true

  async ngOnInit() {
    this.products = await this.product_service.getProducts()
    this.has_items = this.products.length > 0
    this.loading = false
  }

  async applyFilter(filter: ProductFilter) {
    this.loading = true
    this.products = await this.product_service.filter(filter)
    this.loading = false
  }

}