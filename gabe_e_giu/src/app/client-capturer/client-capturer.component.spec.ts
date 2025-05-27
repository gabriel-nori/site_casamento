import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCapturerComponent } from './client-capturer.component';

describe('ClientCapturerComponent', () => {
  let component: ClientCapturerComponent;
  let fixture: ComponentFixture<ClientCapturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCapturerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCapturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
