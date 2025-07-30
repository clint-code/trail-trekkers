import { TestBed } from '@angular/core/testing';

import { AboutItemsService } from './about-items.service';

describe('AboutItemsService', () => {
  let service: AboutItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
