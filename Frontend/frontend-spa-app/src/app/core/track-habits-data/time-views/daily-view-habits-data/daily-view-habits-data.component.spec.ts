import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyViewHabitsDataComponent } from './daily-view-habits-data.component';

describe('DailyViewHabitsDataComponent', () => {
  let component: DailyViewHabitsDataComponent;
  let fixture: ComponentFixture<DailyViewHabitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyViewHabitsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyViewHabitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
