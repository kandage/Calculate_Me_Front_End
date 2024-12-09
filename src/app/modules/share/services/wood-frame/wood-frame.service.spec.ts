import { TestBed } from '@angular/core/testing';

import { WoodFrameService } from './wood-frame.service';

describe('WoodFrameService', () => {
  let service: WoodFrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WoodFrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
