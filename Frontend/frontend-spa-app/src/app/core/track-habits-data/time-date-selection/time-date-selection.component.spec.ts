import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDateSelectionComponent } from './time-date-selection.component';

describe('TimeDateSelectionComponent', () => {
  let component: TimeDateSelectionComponent;
  let fixture: ComponentFixture<TimeDateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeDateSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeDateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
