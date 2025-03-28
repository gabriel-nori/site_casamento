import { Component, VERSION, ElementRef, Renderer2, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-success-purchase',
  imports: [MenuComponent],
  templateUrl: './success-purchase.component.html',
  styleUrl: './success-purchase.component.css'
})
export class SuccessPurchaseComponent implements OnInit {
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.celebrate()
  }

  celebrate() {
    const duration = 3000; // in milliseconds
  
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
  
    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}
