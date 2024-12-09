import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiTermiteCalculatorComponent } from './anti-termite-calculator.component';

describe('AntiTermiteCalculatorComponent', () => {
  let component: AntiTermiteCalculatorComponent;
  let fixture: ComponentFixture<AntiTermiteCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntiTermiteCalculatorComponent]
    });
    fixture = TestBed.createComponent(AntiTermiteCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
