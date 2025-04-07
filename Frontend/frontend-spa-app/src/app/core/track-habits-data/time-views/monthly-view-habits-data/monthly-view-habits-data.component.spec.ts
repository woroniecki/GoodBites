import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyViewHabitsDataComponent } from './monthly-view-habits-data.component';

describe('MonthlyViewHabitsDataComponent', () => {
  let component: MonthlyViewHabitsDataComponent;
  let fixture: ComponentFixture<MonthlyViewHabitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyViewHabitsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyViewHabitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
