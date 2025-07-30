import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAboutItemComponent } from './single-about-item.component';

describe('SingleAboutItemComponent', () => {
  let component: SingleAboutItemComponent;
  let fixture: ComponentFixture<SingleAboutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleAboutItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleAboutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
