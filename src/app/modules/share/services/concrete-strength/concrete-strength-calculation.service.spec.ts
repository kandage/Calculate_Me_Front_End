import { TestBed } from '@angular/core/testing';

import { ConcreteStrengthCalculationService } from './concrete-strength-calculation.service';

describe('ConcreteStrengthCalculationService', () => {
  let service: ConcreteStrengthCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcreteStrengthCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
