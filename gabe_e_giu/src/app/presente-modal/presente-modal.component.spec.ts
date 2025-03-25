import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenteModalComponent } from './presente-modal.component';

describe('PresenteModalComponent', () => {
  let component: PresenteModalComponent;
  let fixture: ComponentFixture<PresenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
