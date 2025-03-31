import { Component, Inject, inject, OnInit, signal, ViewChild } from '@angular/core';
import { environment } from '@environment';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
import { CommonModule } from '@angular/common';
import { Preferences } from '@services/preferences.service';
import { MoneyConverter } from '@services/money_converter.service';

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
    MatIconModule,
    CommonModule
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

  private preferences: Preferences = new Preferences()
  private converter: MoneyConverter = new MoneyConverter()
  private readonly fb = inject(UntypedFormBuilder);
  private readonly stripe_service = new StripeService();
  protected isLinear: boolean = true
  stepIndex = 0;
  loading: boolean = true
  payment_error: string|undefined = undefined

  goNext() {
    if (this.paymentElementForm.invalid) {
      this.paymentElementForm.markAllAsTouched(); // To trigger validation messages
      return;
    }
    this.stepIndex++;
  }

  paymentElementForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    zipcode: [''],
    city: [''],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'pt',
    appearance: {
      theme: 'stripe',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'auto',
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
        amount: this.converter.autoConvert(this.cart.get().total),
        currency: (this.preferences.getPreferences().currency ?? "R$") == "R$" ? 'brl' : 'usd'
      })
      .then(pi => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
        this.loading = false
      });
  }

  pay() {
    if (this.paying()) return;
    this.paying.set(true);
    this.loading = true

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
          this.payment_error = result.error.message
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            this.cart.sendCartPurchase(
              email as string,
              name as string
            ).then(()=>{
              this.loading = false
              this.cart.empty()
              this.dialogRef.close();
              this.router.navigate(['/success'])
            })
          }
        }
      });
  }
}
