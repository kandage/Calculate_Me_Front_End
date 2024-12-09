import { TestBed } from '@angular/core/testing';

import { FlooringCalculatorService } from './flooring-calculator.service';

describe('FlooringCalculatorService', () => {
  let service: FlooringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlooringCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
