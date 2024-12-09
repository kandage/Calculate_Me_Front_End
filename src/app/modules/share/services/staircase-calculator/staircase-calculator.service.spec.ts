import { TestBed } from '@angular/core/testing';

import { StaircaseCalculatorService } from './staircase-calculator.service';

describe('StaircaseCalculatorService', () => {
  let service: StaircaseCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaircaseCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
