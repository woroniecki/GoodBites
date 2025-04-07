import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyViewHabitsDataComponent } from './weekly-view-habits-data.component';

describe('WeeklyViewHabitsDataComponent', () => {
  let component: WeeklyViewHabitsDataComponent;
  let fixture: ComponentFixture<WeeklyViewHabitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyViewHabitsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyViewHabitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
