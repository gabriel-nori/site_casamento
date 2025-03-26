import { CartAddButtonComponent } from '../cart-add-button/cart-add-button.component'
import { Component, Input, NgModule } from '@angular/core'
import { product } from '@models/product.model'
import { MatDialog } from '@angular/material/dialog'

// Importando os módulos necessários para o modal
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PresenteModalComponent } from '../presente-modal/presente-modal.component'

@Component({
  selector: 'app-card-presente',
  imports: [
    CartAddButtonComponent,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './card-presente.component.html',
  styleUrl: './card-presente.component.css'
})

export class CardPresenteComponent {
  @Input() product: product = {
    id: 1,
    photo_path: "",
    name: "",
    description: "",
    price_cents: 0,
    category: "",
    type: "",
  }

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(PresenteModalComponent, {
      width: '90%',
      height: '90%',
      maxHeight: '750px',
      maxWidth: '400',
      data: {item: this.product, include: true}
    });
  }
}
