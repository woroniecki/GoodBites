import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HabitDto } from '../../../../api-client/models/habit-dto';
import { isToday } from '../../common/is-today';

@Component({
  selector: 'app-weekly-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './weekly-view-habits-data.component.html',
  styleUrl: './weekly-view-habits-data.component.css',
  standalone: true,
})
export class WeeklyViewHabitsDataComponent {
  isToday = isToday;

  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekDates: Date[] = [];
  today: Date = new Date();
  private _dateTo: Date = new Date();

  @Input() items: Array<HabitDto> = [];
  @Input()
  set dateTo(value: Date) {
    this._dateTo = value;
    this.generateWeekDates(); // Recalculate week when dateTo changes
  }
  get dateTo(): Date {
    return this._dateTo;
  }
  @Input() dateFrom: Date = new Date();
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  isDateInDailyData(item: HabitDto, date: Date): boolean {
    return item.dailyDatas?.some((d) => {
      const dDate = new Date(d.date);
      return dDate.toDateString() === date.toDateString();
    });
  }

  generateWeekDates() {
    this.weekDates = [];

    if (!this.dateFrom || !this.dateTo) return;

    const current = new Date(this.dateFrom);
    while (current <= this.dateTo) {
      this.weekDates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  clickHabit(habitId: string, date: Date) {
    this.onClickHabit.emit({ habitId: habitId, date: date });
  }
}
