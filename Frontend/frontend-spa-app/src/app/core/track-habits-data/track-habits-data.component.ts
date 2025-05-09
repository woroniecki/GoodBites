import { Component } from '@angular/core';
import { HabitDataService } from '../../api-client/services';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeViewDropdownComponent } from './time-view-dropdown/time-view-dropdown.component';
import { DailyViewHabitsDataComponent } from './time-views/daily-view-habits-data/daily-view-habits-data.component';
import { WeeklyViewHabitsDataComponent } from './time-views/weekly-view-habits-data/weekly-view-habits-data.component';
import { YearlyViewHabitsDataComponent } from './time-views/yearly-view-habits-data/yearly-view-habits-data.component';
import { MonthlyViewHabitsDataComponent } from './time-views/monthly-view-habits-data/monthly-view-habits-data.component';
import { TimeDateSelectionComponent } from './time-date-selection/time-date-selection.component';
import { TimeViewOption } from './enums/time-view-option.enum';
import { UserDropdownComponent } from '../../user-dropdown/user-dropdown.component';
import { HabitDto } from '../../api-client/models/habit-dto';
import { Router } from '@angular/router';

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
    UserDropdownComponent,
  ],
  templateUrl: './track-habits-data.component.html',
  styleUrl: './track-habits-data.component.css',
  standalone: true,
  providers: [DatePipe],
})
export class TrackHabitsDataComponent {
  TimeViewOption = TimeViewOption;

  items: Array<HabitDto> = [];
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  selectedViewType: TimeViewOption = TimeViewOption.Daily;

  constructor(
    private habitsDataApi: HabitDataService,
    private datePipe: DatePipe,
    private router: Router,
  ) {}

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
    this.router.navigate(['/'], { queryParams: { view: event.toLowerCase() } });
  }

  onDateChanged({ from, to }: { from: Date; to: Date }): void {
    this.dateFrom = from;
    this.dateTo = to;
    this.items = [];
    this.getHabitData();
  }

  refreshDate() {
    this.getHabitData();
  }

  clickHabit({ habitId, date }: { habitId: string; date: Date }): void {
    const dateValue = this.datePipe.transform(date, 'yyyy-MM-dd') as string;

    if (
      !this.items
        .find((item) => item.id === habitId)
        ?.dailyDatas?.some((d) => {
          const dDate = new Date(d.date);
          return dDate.toDateString() === date.toDateString();
        })
    ) {
      this.habitsDataApi
        .apiCoreHabitDataAddHabitDataPost$Json({
          body: { date: dateValue, habitId },
        })
        .subscribe((dto) => {
          const item = this.items.find((item) => item.id === habitId);
          if (item) {
            item.streak = dto.streak;
            item.dailyDatas = [
              ...item.dailyDatas,
              ...dto.dailyDatas.filter((d) => {
                const dDate = new Date(d.date);
                return dDate.toDateString() === date.toDateString();
              }),
            ];
          }
        });
    } else {
      this.habitsDataApi
        .apiCoreHabitDataClearHabitDataPost$Json({
          body: { date: dateValue, habitId },
        })
        .subscribe((dto) => {
          const item = this.items.find((item) => item.id === habitId);
          if (item) {
            item.streak = dto.streak;
            item.dailyDatas = [
              ...item.dailyDatas.filter((d) => {
                const dDate = new Date(d.date);
                return dDate.toDateString() !== date.toDateString();
              }),
            ];
          }
        });
    }
  }
}
