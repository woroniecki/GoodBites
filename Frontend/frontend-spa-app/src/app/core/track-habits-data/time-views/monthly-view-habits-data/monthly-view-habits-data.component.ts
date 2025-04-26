import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitDto } from '../../../../api-client/models/habit-dto';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { isToday } from '../../common/is-today';

@Component({
  selector: 'app-monthly-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './monthly-view-habits-data.component.html',
  styleUrls: ['./monthly-view-habits-data.component.css'],
  standalone: true,
})
export class MonthlyViewHabitsDataComponent {
  isToday = isToday;

  weekDays: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  daysInMonth: Date[] = [];
  blankDays: number[] = [];

  @Input() items: Array<HabitDto> = [];

  @Input() _dateFrom: Date = new Date();
  @Input()
  set dateFrom(value: Date) {
    this._dateFrom = value;
    this.generateMonthDates();
  }
  get dateFrom(): Date {
    return this._dateFrom;
  }

  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  ngOnInit() {
    this.generateMonthDates();
  }

  private generateMonthDates() {
    this.daysInMonth = [];
    this.blankDays = [];

    const year = this.dateFrom.getFullYear();
    const month = this.dateFrom.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    const jsDay = firstOfMonth.getDay();
    const firstDayOfMonth = (jsDay + 6) % 7;

    this.blankDays = Array(firstDayOfMonth).fill(0);

    const current = new Date(firstOfMonth);
    while (current <= lastOfMonth) {
      this.daysInMonth.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  isDateInDailyData(item: HabitDto, date: Date): boolean {
    return item.dailyDatas?.some((d) => {
      const dDate = new Date(d.date);
      return dDate.toDateString() === date.toDateString();
    });
  }

  clickHabit(habitId: string, date: Date) {
    this.onClickHabit.emit({ habitId: habitId, date: date });
  }
}
