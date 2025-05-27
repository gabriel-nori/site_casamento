import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Client } from '@models/client.model';
import { Preferences } from '@services/preferences.service';

@Component({
  selector: 'app-client-capturer',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './client-capturer.component.html',
  styleUrl: './client-capturer.component.css'
})
export class ClientCapturerComponent implements OnInit{
  private readonly fb = inject(UntypedFormBuilder);
  preferences: Preferences = new Preferences()
  client: Client | undefined = undefined
  protected visible: boolean = false
  
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.client = this.preferences.getClient()
    this.visible = this.client == undefined
  }

  close(): void {
    this.visible = false
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // To trigger validation messages
      return;
    }
    const {name, email} = this.form.getRawValue()
    const client: Client = {
      email: email,
      name: name
    }
    this.preferences.storeClient(client)
    this.close()
  }
}
