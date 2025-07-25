import { TestBed } from '@angular/core/testing';

import { HikePostsService } from './hike-posts.service';

describe('HikePostsService', () => {
  let service: HikePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
