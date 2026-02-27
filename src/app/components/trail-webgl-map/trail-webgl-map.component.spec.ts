import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailWebglMapComponent } from './trail-webgl-map.component';

describe('TrailWebglMapComponent', () => {
  let component: TrailWebglMapComponent;
  let fixture: ComponentFixture<TrailWebglMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailWebglMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailWebglMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
