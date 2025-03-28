import { Component, Inject, inject, OnInit, signal, ViewChild } from '@angular/core';
import { environment } from '@environment';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';

import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import {
  StripeElementsOptions,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { StripeService } from '@services/stripe.service';
import { MatStepperModule } from '@angular/material/stepper';
import { CartService } from '@services/cart.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-payment-modal',
  imports: [
    StripeElementsDirective,
    StripePaymentElementComponent,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
  ],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit {
  constructor(
    private cart: CartService,
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    private router: Router
  ){}

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);
  private readonly stripe_service = new StripeService();

  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  // Replace with your own public key
  stripe = injectStripe(environment.stripe_key);
  paying = signal(false);

  ngOnInit() {
    this.stripe_service
      .createPaymentIntent({
        amount: this.cart.get().total,
        currency: 'brl'
      })
      .then(pi => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
      });
  }

  pay() {
    if (this.paying()) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } = this.paymentElementForm.getRawValue();
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            this.cart.empty()
            this.dialogRef.close();
            this.router.navigate(['/success'])
          }
        }
      });
  }
}
