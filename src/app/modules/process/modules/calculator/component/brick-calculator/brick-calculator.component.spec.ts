import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickCalculatorComponent } from './brick-calculator.component';

describe('BrickCalculatorComponent', () => {
  let component: BrickCalculatorComponent;
  let fixture: ComponentFixture<BrickCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrickCalculatorComponent]
    });
    fixture = TestBed.createComponent(BrickCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
