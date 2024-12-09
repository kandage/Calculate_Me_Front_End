import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteStrengthComponent } from './concrete-strength.component';

describe('ConcreteStrengthComponent', () => {
  let component: ConcreteStrengthComponent;
  let fixture: ComponentFixture<ConcreteStrengthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcreteStrengthComponent]
    });
    fixture = TestBed.createComponent(ConcreteStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
