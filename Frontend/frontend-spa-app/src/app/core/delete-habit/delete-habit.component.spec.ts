import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHabitComponent } from './delete-habit.component';

describe('DeleteHabitComponent', () => {
  let component: DeleteHabitComponent;
  let fixture: ComponentFixture<DeleteHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHabitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
