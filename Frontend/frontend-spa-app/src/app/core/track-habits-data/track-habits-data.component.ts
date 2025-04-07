import { Component, OnInit } from '@angular/core';
import { HabitDataService } from '../../api-client/services';
import { CommonModule } from '@angular/common';
import { GetHabitsDataQueryResponse } from '../../api-client/models/get-habits-data-query-response';
import {
  TimeViewDropdownComponent,
  TimeViewOption,
} from './time-view-dropdown/time-view-dropdown.component';
import { DailyViewHabitsDataComponent } from './time-views/daily-view-habits-data/daily-view-habits-data.component';
import { WeeklyViewHabitsDataComponent } from './time-views/weekly-view-habits-data/weekly-view-habits-data.component';
import { YearlyViewHabitsDataComponent } from './time-views/yearly-view-habits-data/yearly-view-habits-data.component';
import { MonthlyViewHabitsDataComponent } from './time-views/monthly-view-habits-data/monthly-view-habits-data.component';

@Component({
  selector: 'app-track-habits-data',
  imports: [
    CommonModule,
    TimeViewDropdownComponent,
    DailyViewHabitsDataComponent,
    WeeklyViewHabitsDataComponent,
    MonthlyViewHabitsDataComponent,
    YearlyViewHabitsDataComponent,
  ],
  templateUrl: './track-habits-data.component.html',
  styleUrl: './track-habits-data.component.css',
  standalone: true,
})
export class TrackHabitsDataComponent implements OnInit {
  TimeViewOption = TimeViewOption;

  items: Array<GetHabitsDataQueryResponse> = [];
  date: string = new Date().toISOString().split('T')[0];
  selectedViewType: TimeViewOption = TimeViewOption.Daily;

  constructor(private habitsDataApi: HabitDataService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.habitsDataApi
      .apiCoreHabitDataGetHabitsDataGet$Json({
        date: today,
      })
      .subscribe({
        next: (data) => {
          this.items = data;
        },
        error: (err) => {
          console.log('Error loading habits daily data:', err);
        },
      });
  }

  onViewOptionChanged(event: TimeViewOption): void {
    this.selectedViewType = event;
  }

  clickHabit({ habitId, date }: { habitId: string; date: string }): void {
    if (
      this.items.find((item) => item.id === habitId)?.dailyDatas?.length === 0
    ) {
      this.habitsDataApi
        .apiCoreHabitDataAddHabitDataPost({ body: { date, habitId } })
        .subscribe(() => {
          this.items
            .find((item) => item.id === habitId)
            ?.dailyDatas.push({
              date: date,
              count: 1,
            });
        });
    } else {
      this.habitsDataApi
        .apiCoreHabitDataClearHabitDataPost({ body: { date, habitId } })
        .subscribe(() => {
          this.items.find((item) => item.id === habitId)!.dailyDatas = [];
        });
    }
  }
}
