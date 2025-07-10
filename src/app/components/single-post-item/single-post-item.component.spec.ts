import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostItemComponent } from './single-post-item.component';

describe('SinglePostItemComponent', () => {
  let component: SinglePostItemComponent;
  let fixture: ComponentFixture<SinglePostItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePostItemComponent]
    });
    fixture = TestBed.createComponent(SinglePostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
