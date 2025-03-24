import { product } from '@models/product.model'
import { CacheService } from '@services/cache.service'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private product_cache: CacheService<product> = new CacheService("product_list", true, "products.php")
    private category_cache: CacheService<string> = new CacheService("product_category", true)
    private type_cache: CacheService<string> = new CacheService("product_type", true)
  
    public async getProducts(): Promise<product[]> {
        return await this.product_cache.getDataAutomatic()
    }

    async getCategories(): Promise<string[]>{
        return []
    }
}