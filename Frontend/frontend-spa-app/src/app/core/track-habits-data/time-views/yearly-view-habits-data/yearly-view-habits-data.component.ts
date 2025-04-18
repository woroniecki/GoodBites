import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HabitDto } from '../../../../api-client/models/habit-dto';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-yearly-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './yearly-view-habits-data.component.html',
  styleUrl: './yearly-view-habits-data.component.css',
  standalone: true,
})
export class YearlyViewHabitsDataComponent {
  @Input() items: Array<HabitDto> = [];
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  year: number = 0;
  @Input()
  set dateFrom(value: Date) {
    console.log(value.getFullYear())
    this.year = value.getFullYear();
    this.generateCalendar();
  }

  romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  calendarGrid: Date[][] = [];

  ngOnInit() {
  }

  generateCalendar() {
    const calendar: Date[][] = [];

    for (let month = 0; month < 12; month++) {
      const days: Date[] = [];
      const date = new Date(this.year, month, 1);

      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      calendar.push(days);
    }

    this.calendarGrid = calendar;
  }

  isToday(day: Date | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }

  isDateInDailyData(item: HabitDto, date: Date): boolean {
    return item.dailyDatas?.some((d) => {
      const dDate = new Date(d.date);
      return dDate.toDateString() === date.toDateString();
    });
  }

  clickHabit(habitId: string, date: Date) {
    this.onClickHabit.emit({habitId: habitId, date: date});
  }
}
