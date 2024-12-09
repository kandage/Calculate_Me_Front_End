import { TestBed } from '@angular/core/testing';

import { SteelQuantityService } from './steel-quantity.service';

describe('SteelQuantityService', () => {
  let service: SteelQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteelQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
