import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackHabitsDataComponent } from './track-habits-data.component';

describe('TrackHabitsDataComponent', () => {
  let component: TrackHabitsDataComponent;
  let fixture: ComponentFixture<TrackHabitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackHabitsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackHabitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
