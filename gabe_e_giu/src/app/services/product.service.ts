import { product } from '@models/product.model'
import { CacheService } from '@services/cache.service'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private readonly DEFAULT_CACHE_TIME: number = 15 * 60 * 1000;
    private product_cache: CacheService<product> = new CacheService("product_list", this.DEFAULT_CACHE_TIME, true, "products.php")
    private category_cache: CacheService<string> = new CacheService("product_category", this.DEFAULT_CACHE_TIME, true)
    private type_cache: CacheService<string> = new CacheService("product_type", this.DEFAULT_CACHE_TIME, true)
  
    public async getProducts(): Promise<product[]|undefined> {
        return await this.product_cache.getDataAutomatic()
    }

    async getCategories(): Promise<string[]|undefined>{
        return undefined
    }
}