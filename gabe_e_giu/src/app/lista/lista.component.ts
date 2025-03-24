import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service'

@Component({
  selector: 'app-lista',
  imports: [ProductService],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit{
  product_service: ProductService = new ProductService()
  async ngOnInit() {
    console.log(await this.product_service.getProducts)
  }

}
