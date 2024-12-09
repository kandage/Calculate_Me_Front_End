import { TestBed } from '@angular/core/testing';

import { SolarPanelCalculatorService } from './solar-panel-calculator.service';

describe('SolarPanelCalculatorService', () => {
  let service: SolarPanelCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolarPanelCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
