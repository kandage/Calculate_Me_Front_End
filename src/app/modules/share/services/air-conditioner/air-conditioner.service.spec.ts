import { TestBed } from '@angular/core/testing';

import { AirConditionerService } from './air-conditioner.service';

describe('AirConditionerService', () => {
  let service: AirConditionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirConditionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
