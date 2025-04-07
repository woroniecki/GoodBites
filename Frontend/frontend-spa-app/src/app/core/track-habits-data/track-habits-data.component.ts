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
        dateFrom: this.dateFrom.toISOString().split('T')[0],
        dateTo: this.dateTo.toISOString().split('T')[0],
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
    this.items = [];

    switch (this.selectedViewType) {
      case TimeViewOption.Daily:
        this.dateFrom = new Date();
        this.dateTo = this.dateFrom;
      break;
      case TimeViewOption.Weekly:
        let today = new Date();
        this.dateFrom = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        this.dateTo = new Date(today.setDate(this.dateFrom.getDate() + 6));
      break;
      case TimeViewOption.Monthly:
      // const currentMonth = new Date();
      // const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      // const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      // this.date = firstDayOfMonth.toISOString().split('T')[0];
      // this.dateTo = lastDayOfMonth.toISOString().split('T')[0];
      break;
      case TimeViewOption.Yearly:
      // const currentYear = new Date();
      // const firstDayOfYear = new Date(currentYear.getFullYear(), 0, 1);
      // const lastDayOfYear = new Date(currentYear.getFullYear(), 11, 31);
      // this.date = firstDayOfYear.toISOString().split('T')[0];
      // this.dateTo = lastDayOfYear.toISOString().split('T')[0];
      break;
    }

    this.getHabitData();
  }

  clickHabit({ habitId, date }: { habitId: string; date: Date }): void {
    const dateValue = date.toISOString().split('T')[0];

    if (
      !this.items.find((item) => item.id === habitId)?.dailyDatas?.some((d) => {
        const dDate = new Date(d.date);
        return dDate.toDateString() === date.toDateString();
      })
    ) {
      this.habitsDataApi
        .apiCoreHabitDataAddHabitDataPost({ body: { date: dateValue, habitId } })
        .subscribe(() => {
          this.items
            .find((item) => item.id === habitId)
            ?.dailyDatas.push({
              date: dateValue,
              count: 1,
            });
        });
    } else {
      this.habitsDataApi
        .apiCoreHabitDataClearHabitDataPost({ body: { date: dateValue, habitId } })
        .subscribe(() => {
          const item = this.items.find((item) => item.id === habitId)
          item!.dailyDatas = item!.dailyDatas.filter((d) => {
            const dDate = new Date(d.date);
            return dDate.toDateString() !== date.toDateString();
          });
        });
    }
  }
}
