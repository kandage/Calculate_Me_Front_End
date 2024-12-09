import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlooringCalculatorComponent } from './flooring-calculator.component';

describe('FlooringCalculatorComponent', () => {
  let component: FlooringCalculatorComponent;
  let fixture: ComponentFixture<FlooringCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlooringCalculatorComponent]
    });
    fixture = TestBed.createComponent(FlooringCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
