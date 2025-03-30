import { Component, OnInit } from '@angular/core';
import { OrderKey, product, ProductFilter } from '@models/product.model';
import { ProductService } from '@services/product.service'
import { CardPresenteComponent } from '../card-presente/card-presente.component';
import { CommonModule } from '@angular/common';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { MenuComponent } from '../menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-presentes',
  imports: [
    CommonModule,
    CardPresenteComponent,
    FilterSearchComponent,
    MenuComponent,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './presentes.component.html',
  styleUrl: './presentes.component.css'
})
export class PresentesComponent implements OnInit{
  product_service: ProductService = new ProductService()
  products: product[] = []
  has_items: boolean = false
  filter_obj: ProductFilter = {
    order:{
      key: "id",
      field_type: 'number',
      name: "Padrão",
      order: 'asc'
    }
  }
  filter_map: OrderKey = {
    "padrao": {
      key: "id",
      field_type: 'number',
      name: "Padrão",
      order: 'asc'
    },
    "low_price": {
      key: "price_cents",
      order: "asc",
      field_type: 'number',
      name: "Menor preço"
    },
    "high_price": {
      key: "price_cents",
      order: "desc",
      field_type: 'number',
      name: "Maior preço"
    }
  }

  async ngOnInit() {
    this.products = await this.product_service.getProducts()
    this.has_items = this.products.length > 0
  }

  searchUpdated(term: string) {
    this.filter_obj["search_term"] = term
    this.applyFilter()
  }

  orderUpdated(filter: string) {
    this.filter_obj["order"] = this.filter_map[filter]
    this.applyFilter()
  }

  async applyFilter() {
    this.products = await this.product_service.filter(this.filter_obj)
  }

}