import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HabitDto } from '../../../../api-client/models/habit-dto';

@Component({
  selector: 'app-weekly-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './weekly-view-habits-data.component.html',
  styleUrl: './weekly-view-habits-data.component.css',
  standalone: true,
})
export class WeeklyViewHabitsDataComponent {
  today: Date = new Date();

  @Input()  items: Array<HabitDto> = [];
  @Input() dateTo: Date = new Date();
  @Input() dateFrom: Date = new Date();
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  isDateInDailyData(item: HabitDto, date: Date): boolean {
    return item.dailyDatas?.some((d) => {
      const dDate = new Date(d.date);
      return dDate.toDateString() === date.toDateString();
    });
  }

  getDays(): Date[] {
    const dates: Date[] = [];
    if (this.dateFrom > this.dateTo) {
      console.warn('dateFrom is greater than dateTo. Returning an empty array.');
      return dates;
    }

    const currentDate = new Date(this.dateFrom);

    while (currentDate <= this.dateTo) {
      dates.push(new Date(currentDate.getTime())); // Ensure a new Date instance is created
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  clickHabit(habitId: string, date: Date) {
    this.onClickHabit.emit({habitId: habitId, date: date});
  }
}
