import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HabitDto } from '../../../../api-client/models/habit-dto';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { isToday } from '../../common/is-today';
import { HabitActionsDropdownComponent } from '../habit-actions-dropdown/habit-actions-dropdown.component';

@Component({
  selector: 'app-yearly-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule, HabitActionsDropdownComponent],
  templateUrl: './yearly-view-habits-data.component.html',
  styleUrl: './yearly-view-habits-data.component.css',
  standalone: true,
})
export class YearlyViewHabitsDataComponent {
  isToday = isToday;

  @Input() items: Array<HabitDto> = [];
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();
  @Output() onHabitsChange = new EventEmitter<void>();

  year: number = 0;
  @Input()
  set dateFrom(value: Date) {
    this.year = value.getFullYear();
    this.generateCalendar();
  }

  romanMonths = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
  ];
  calendarGrid: Date[][] = [];

  ngOnInit() {}

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
