import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotnhlyViewHabitsDataComponent } from './motnhly-view-habits-data.component';

describe('MotnhlyViewHabitsDataComponent', () => {
  let component: MotnhlyViewHabitsDataComponent;
  let fixture: ComponentFixture<MotnhlyViewHabitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotnhlyViewHabitsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotnhlyViewHabitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
