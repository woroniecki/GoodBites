import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyViewHabitsDataComponent } from './yearly-view-habits-data.component';

describe('YearlyViewHabitsDataComponent', () => {
  let component: YearlyViewHabitsDataComponent;
  let fixture: ComponentFixture<YearlyViewHabitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyViewHabitsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyViewHabitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
