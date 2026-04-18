import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemnityClauseComponent } from './indemnity-clause.component';

describe('IndemnityClauseComponent', () => {
  let component: IndemnityClauseComponent;
  let fixture: ComponentFixture<IndemnityClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndemnityClauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndemnityClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
