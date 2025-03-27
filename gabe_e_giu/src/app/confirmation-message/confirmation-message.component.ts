import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirmation-message',
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './confirmation-message.component.html',
  styleUrl: './confirmation-message.component.css'
})
export class ConfirmationMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) { }

  confirm(): void {
    this.dialogRef.close(true); // Retorna "true" ao confirmar
  }

  cancel(): void {
    this.dialogRef.close(false); // Retorna "false" ao cancelar
  }
}
