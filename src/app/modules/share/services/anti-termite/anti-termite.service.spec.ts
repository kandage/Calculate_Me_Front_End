import { TestBed } from '@angular/core/testing';

import { AntiTermiteService } from './anti-termite.service';

describe('AntiTermiteService', () => {
  let service: AntiTermiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntiTermiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
