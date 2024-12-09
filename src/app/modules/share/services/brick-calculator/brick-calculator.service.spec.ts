import { TestBed } from '@angular/core/testing';

import { BrickCalculatorService } from './brick-calculator.service';

describe('BrickCalculatorService', () => {
  let service: BrickCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrickCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
