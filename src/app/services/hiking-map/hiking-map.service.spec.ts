import { TestBed } from '@angular/core/testing';

import { HikingMapService } from './hiking-map.service';

describe('HikingMapService', () => {
  let service: HikingMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikingMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
