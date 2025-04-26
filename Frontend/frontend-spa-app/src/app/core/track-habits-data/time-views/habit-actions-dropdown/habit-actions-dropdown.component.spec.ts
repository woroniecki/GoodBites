import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitActionsDropdownComponent } from './habit-actions-dropdown.component';

describe('HabitActionsDropdownComponent', () => {
  let component: HabitActionsDropdownComponent;
  let fixture: ComponentFixture<HabitActionsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitActionsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitActionsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
