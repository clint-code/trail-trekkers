import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHikeInfoItemComponent } from './single-hike-info-item.component';

describe('SingleHikeInfoItemComponent', () => {
  let component: SingleHikeInfoItemComponent;
  let fixture: ComponentFixture<SingleHikeInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleHikeInfoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleHikeInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
