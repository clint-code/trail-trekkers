import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHikeItemComponent } from './single-hike-item.component';

describe('SingleHikeItemComponent', () => {
  let component: SingleHikeItemComponent;
  let fixture: ComponentFixture<SingleHikeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleHikeItemComponent]
    });
    fixture = TestBed.createComponent(SingleHikeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
