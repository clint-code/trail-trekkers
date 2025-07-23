import { TestBed } from '@angular/core/testing';

// TODO: Update the import path below if the service file exists elsewhere
import { AdventurePostsService } from './adventure-posts.service';

describe('AdventurePostsService', () => {
  let service: AdventurePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventurePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
