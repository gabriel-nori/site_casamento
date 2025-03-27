import { cartInterface, CartProductInterface } from '@models/cart.model';
import { CartService } from '@services/cart.service'
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { product } from '@models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { PresenteModalComponent } from '../presente-modal/presente-modal.component';
import { ConfirmationMessageComponent } from '../confirmation-message/confirmation-message.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(
    private cart: CartService,
    public dialog: MatDialog
  ){
    this.cart_data = this.cart.get()
  }

  protected cart_items: CartProductInterface[] = []
  protected cart_data: cartInterface = {total: 0, item_count: 0, items: {}}

  ngOnInit() {
    this.loadCartItems()
  }

  private loadCartItems(): void {
    this.cart_items = []
    for (const key in this.cart_data.items) {
      this.cart_items.push(this.cart_data.items[key])
    }
  }

  edit_item(item: CartProductInterface): void {
    this.dialog.open(PresenteModalComponent, {
      width: '90%',
      height: '90%',
      maxHeight: '750px',
      maxWidth: '400',
      data: {item: item, include: false}
    });
  }

  remove_item(item: CartProductInterface): void {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '400px',
      data: {
        title: 'Excluir item',
        message: 'Tem certeza que deseja excluir o item da lista de compra?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cart.removeItem(item.id)
        this.loadCartItems()
      }
    });
  }
}
