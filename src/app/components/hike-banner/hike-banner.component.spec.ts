import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikeBannerComponent } from './hike-banner.component';

describe('HikeBannerComponent', () => {
  let component: HikeBannerComponent;
  let fixture: ComponentFixture<HikeBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HikeBannerComponent]
    });
    fixture = TestBed.createComponent(HikeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
