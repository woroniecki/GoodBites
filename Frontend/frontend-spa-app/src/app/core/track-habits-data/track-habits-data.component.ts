import { Component, OnInit } from '@angular/core';
import { HabitDataService } from '../../api-client/services';
import { CommonModule } from '@angular/common';
import { GetHabitsDataQueryResponse } from '../../api-client/models/get-habits-data-query-response';
import { TimeViewDropdownComponent } from './time-view-dropdown/time-view-dropdown.component';
import { DailyViewHabitsDataComponent } from './time-views/daily-view-habits-data/daily-view-habits-data.component';
import { WeeklyViewHabitsDataComponent } from './time-views/weekly-view-habits-data/weekly-view-habits-data.component';
import { YearlyViewHabitsDataComponent } from './time-views/yearly-view-habits-data/yearly-view-habits-data.component';
import { MonthlyViewHabitsDataComponent } from './time-views/monthly-view-habits-data/monthly-view-habits-data.component';
import { TimeDateSelectionComponent } from './time-date-selection/time-date-selection.component';
import { TimeViewOption } from './enums/time-view-option.enum';

@Component({
  selector: 'app-track-habits-data',
  imports: [
    CommonModule,
    TimeDateSelectionComponent,
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
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  selectedViewType: TimeViewOption = TimeViewOption.Daily;

  constructor(private habitsDataApi: HabitDataService) {}

  ngOnInit(): void {
    this.getHabitData();
  }

  private getHabitData() {
    this.habitsDataApi
      .apiCoreHabitDataGetHabitsDataGet$Json({
        dateFrom: this.dateFrom.toLocaleDateString('sv-SE'),
        dateTo: this.dateTo.toLocaleDateString('sv-SE'),
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

  onDateChanged({from, to} : {from: Date, to: Date}): void {
    this.dateFrom = from;
    this.dateTo = to;
    this.items = [];
    this.getHabitData();
  }

  refreshDate(){
    this.getHabitData();
  }

  clickHabit({ habitId, date }: { habitId: string; date: Date }): void {
    const dateValue = date.toISOString().split('T')[0];

    if (
      !this.items
        .find((item) => item.id === habitId)
        ?.dailyDatas?.some((d) => {
          const dDate = new Date(d.date);
          return dDate.toDateString() === date.toDateString();
        })
    ) {
      this.habitsDataApi
        .apiCoreHabitDataAddHabitDataPost({
          body: { date: dateValue, habitId },
        })
        .subscribe(() => {
          this.getHabitData();
        });
    } else {
      this.habitsDataApi
        .apiCoreHabitDataClearHabitDataPost({
          body: { date: dateValue, habitId },
        })
        .subscribe(() => {
          this.getHabitData();
        });
    }
  }
}
