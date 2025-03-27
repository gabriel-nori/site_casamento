import { Component, OnInit } from '@angular/core';
import { product } from '@models/product.model';
import { ProductService } from '@services/product.service'
import { CardPresenteComponent } from '../card-presente/card-presente.component';
import { CommonModule } from '@angular/common';
import { FilterSearchComponent } from '../filter-search/filter-search.component';

@Component({
  selector: 'app-presentes',
  imports: [
    CommonModule,
    CardPresenteComponent,
    FilterSearchComponent
  ],
  templateUrl: './presentes.component.html',
  styleUrl: './presentes.component.css'
})
export class PresentesComponent implements OnInit{
  product_service: ProductService = new ProductService()
  products: product[] = []
  has_items: boolean = false

  async ngOnInit() {
    this.products = await this.product_service.getProducts()
    this.has_items = this.products.length > 0
  }

}