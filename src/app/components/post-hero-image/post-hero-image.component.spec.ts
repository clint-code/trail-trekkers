import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeroImageComponent } from './post-hero-image.component';

describe('PostHeroImageComponent', () => {
  let component: PostHeroImageComponent;
  let fixture: ComponentFixture<PostHeroImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostHeroImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostHeroImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
