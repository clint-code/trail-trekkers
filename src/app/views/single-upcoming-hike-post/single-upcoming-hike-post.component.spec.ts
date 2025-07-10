import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUpcomingHikePostComponent } from './single-upcoming-hike-post.component';

describe('SingleUpcomingHikePostComponent', () => {
  let component: SingleUpcomingHikePostComponent;
  let fixture: ComponentFixture<SingleUpcomingHikePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUpcomingHikePostComponent]
    });
    fixture = TestBed.createComponent(SingleUpcomingHikePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
