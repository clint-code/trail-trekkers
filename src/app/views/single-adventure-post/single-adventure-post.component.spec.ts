import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAdventurePostComponent } from './single-adventure-post.component';

describe('SingleAdventurePostComponent', () => {
  let component: SingleAdventurePostComponent;
  let fixture: ComponentFixture<SingleAdventurePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAdventurePostComponent]
    });
    fixture = TestBed.createComponent(SingleAdventurePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
