import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddButtonComponent } from './cart-add-button.component';

describe('CartAddButtonComponent', () => {
  let component: CartAddButtonComponent;
  let fixture: ComponentFixture<CartAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAddButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
