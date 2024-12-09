import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaircaseCalculatorComponent } from './staircase-calculator.component';

describe('StaircaseCalculatorComponent', () => {
  let component: StaircaseCalculatorComponent;
  let fixture: ComponentFixture<StaircaseCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaircaseCalculatorComponent]
    });
    fixture = TestBed.createComponent(StaircaseCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
