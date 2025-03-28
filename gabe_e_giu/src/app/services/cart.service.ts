import { cartInterface, CartProductInterface } from '@models/cart.model';
import { product } from '@models/product.model'
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private readonly cart_key: string = "cart_storage"
    private cart: cartInterface = {
        total: 0,
        item_count: 0,
        items:{}
    }
    private api: ApiService<boolean> = new ApiService()

    constructor(){
        this.loadCart()
    }

    private loadCart() {
        const stored_data = localStorage.getItem(this.cart_key)
        if(!stored_data) {
            return
        }
        const data: cartInterface = JSON.parse(stored_data)
        this.cart = data
    }

    private storeCart() {
        localStorage.setItem(this.cart_key, JSON.stringify(this.cart))
    }

    public addItem(item: product, quantity: number) {
        if(item.id in this.cart.items){
            this.increaseQuantity(item, quantity)
        }
        else {
            this.cart.items[item.id] = Object.assign(
                item,
                {
                    quantity: quantity,
                    total_cents: item.price_cents * quantity
                }
            )
            this.updatePriceQuantity()
        }
    }

    public updateQuantity(item: product, quantity: number) {
        this.cart.items[item.id].quantity = quantity
        this.cart.items[item.id].total_cents = item.price_cents * quantity
        this.updatePriceQuantity()
    }

    public increaseQuantity(item: product, ammount: number) {
        this.cart.items[item.id].quantity += ammount
        this.updatePriceQuantity()
    }

    public removeItem(id: number) {
        delete this.cart.items[id]
        this.updatePriceQuantity()
    }

    private updatePriceQuantity() {
        let total_price = 0
        let total_items = 0

        for (const key in this.cart.items) {
            if (this.cart.items.hasOwnProperty(key)) {
                let item = this.cart.items[key]
                total_price += item.quantity * item.price_cents
                total_items += item.quantity
            }
        }
        this.cart.item_count = total_items
        this.cart.total = total_price
        this.storeCart()
    }

    public get(): cartInterface {
        return this.cart
    }

    public getItemById(id: number|string): CartProductInterface {
        return this.cart.items[id]
    }

    public empty(): void {
        this.cart = {
            total: 0,
            item_count: 0,
            items:{}
        }
        this.storeCart()
    }

    public getIds(): number[] {
        let id_list: number[] = []
        for(let item in this.cart.items){
            id_list.push(this.cart.items[item].id)
        }
        return id_list
    }

    public getProductsQuantity(): {id: number, quantity: number}[] {
        let product_list: {id: number, quantity: number}[] = []
        for(let item in this.cart.items){
            let cart_item = this.cart.items[item]
            product_list.push(
                {
                    id: cart_item.id,
                    quantity: cart_item.quantity
                }
            )
        }
        return product_list
    }

    public async sendCartPurchase(email: string, name: string): Promise<boolean> {
        const result = await this.api.postData(
            "checkout.php", 
            {
                body:{
                    email: email,
                    name: name,
                    total: this.cart.total,
                    products: this.getProductsQuantity()
                }
            }
        )
        return result
    }
}