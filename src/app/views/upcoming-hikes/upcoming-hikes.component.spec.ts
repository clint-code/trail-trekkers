import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingHikesComponent } from './upcoming-hikes.component';

describe('UpcomingHikesComponent', () => {
  let component: UpcomingHikesComponent;
  let fixture: ComponentFixture<UpcomingHikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingHikesComponent]
    });
    fixture = TestBed.createComponent(UpcomingHikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
