import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, NgModule } from '@angular/core'

// Importando os módulos necessários para o modal
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { product } from '@models/product.model';
import { CartAddButtonComponent } from '../cart-add-button/cart-add-button.component';
import { CartProductInterface } from '@models/cart.model';

@Component({
  selector: 'app-presente-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    CartAddButtonComponent
  ],
  templateUrl: './presente-modal.component.html',
  styleUrl: './presente-modal.component.css'
})
export class PresenteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PresenteModalComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: product|CartProductInterface
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
