import { Categories, product, ProductFilter, Tags, Types } from '@models/product.model'
import { CacheService } from '@services/cache.service'
import { Injectable } from '@angular/core';
import { MoneyConverter } from './money_converter.service';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private product_cache: CacheService<product> = new CacheService("product_list", true, "products.php")
    private category_cache: CacheService<string> = new CacheService("product_category", true, "categories.php")
    private type_cache: CacheService<string> = new CacheService("product_type", true, "types.php")
    private tags_cache: CacheService<Tags> = new CacheService("product_type", true, "tags.php")
    private converter: MoneyConverter = new MoneyConverter()

    public async getProducts(): Promise<product[]> {
        return await this.product_cache.getDataAutomatic()
    }

    async getCategories(): Promise<string[]> {
        return await this.category_cache.getDataAutomatic()
    }

    async getTypes(): Promise<string[]> {
        return await this.type_cache.getDataAutomatic()
    }

    async getTags(): Promise<Tags[]> {
        return await this.tags_cache.getDataAutomatic()
    }

    private filterProductsBy(products: product[], key: string, values: string[]): product[] {
        return products.filter(product => key in product && values.includes((product as any)[key]));
    }

    private searchProducts(products: product[], value: string): product[] {
        if (value == "") {
            return products
        }
        return products.filter(product => product["name"].toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    }

    public async filter(filter_by: ProductFilter): Promise<product[]> {
        let filtered: product[] = structuredClone(await this.getProducts())
        if ("search_term" in filter_by) {
            filtered = this.searchProducts(filtered, filter_by["search_term"] ?? "")
        }

        // for (const key in filter_by) {
        //     if (filter_by.hasOwnProperty(key)) {
        //         filtered = this.filterProductsBy(filtered, )
        //     }
        // }

        // if("currency" in filter_by){
        //     filtered.forEach(
        //         product => {
        //             product.price_cents = this.converter.convert(
        //                 product.price_cents,
        //                 filter_by.currency
        //             )
        //             product.currency = filter_by.currency
        //         }
        //     )
        // }

        if ("order" in filter_by) {
            const key = filter_by["order"].key as keyof typeof filtered[0];
            if (filter_by["order"].field_type === 'number') {

                if (filter_by["order"].order === "desc") {
                    filtered = filtered.sort((a, b) => {
                        const valueA = a[key] as number;
                        const valueB = b[key] as number;
                        return valueB - valueA;
                    });
                }

                if (filter_by["order"].order === "asc") {
                    filtered = filtered.sort((a, b) => {
                        const valueA = a[key] as number;
                        const valueB = b[key] as number;
                        return valueA - valueB;
                    });
                }
            }
        }

        return filtered
    }
}