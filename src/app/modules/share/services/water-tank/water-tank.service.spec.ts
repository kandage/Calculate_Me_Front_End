import { TestBed } from '@angular/core/testing';

import { WaterTankService } from './water-tank.service';

describe('WaterTankService', () => {
  let service: WaterTankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterTankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
