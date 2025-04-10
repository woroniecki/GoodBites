import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitSettingsButtonComponent } from './habit-settings-button.component';

describe('HabitSettingsButtonComponent', () => {
  let component: HabitSettingsButtonComponent;
  let fixture: ComponentFixture<HabitSettingsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitSettingsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitSettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
