import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeViewDropdownComponent } from './time-view-dropdown.component';

describe('TimeViewDropdownComponent', () => {
  let component: TimeViewDropdownComponent;
  let fixture: ComponentFixture<TimeViewDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeViewDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeViewDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
