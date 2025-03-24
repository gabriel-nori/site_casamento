import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service'

@Component({
  selector: 'app-presentes',
  imports: [],
  templateUrl: './presentes.component.html',
  styleUrl: './presentes.component.css'
})
export class PresentesComponent implements OnInit{
  product_service: ProductService = new ProductService()
  async ngOnInit() {
    console.log(await this.product_service.getProducts())
  }

}