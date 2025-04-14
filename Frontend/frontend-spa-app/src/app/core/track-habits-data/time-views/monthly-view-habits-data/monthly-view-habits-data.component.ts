import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitDto } from '../../../../api-client/models/habit-dto';

@Component({
  selector: 'app-monthly-view-habits-data',
  imports: [CommonModule],
  templateUrl: './monthly-view-habits-data.component.html',
  styleUrls: ['./monthly-view-habits-data.component.css'],
  standalone: true,
})
export class MonthlyViewHabitsDataComponent {
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysInMonth: Date[] = [];
  blankDays: number[] = [];

  private _items: Array<HabitDto> = [];
  private dayDataDict: {
    [key: string]: { positive: number; negative: number };
  } = {};

  @Input()
  set items(value: Array<HabitDto>) {
    this._items = value;
    this.initializeDayData();
  }
  get items(): Array<HabitDto> {
    return this._items;
  }

  @Input() _dateFrom: Date = new Date();
  @Input()
  set dateFrom(value: Date) {
    this._dateFrom = value;
    this.init();
  }
  get dateFrom(): Date {
    return this._dateFrom;
  }

  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  ngOnInit() {
    this.init();
  }

  private init() {
    const year = this.dateFrom.getFullYear();
    const month = this.dateFrom.getMonth();
  
    // Correctly get total days in the current month
    const totalDays = new Date(year, month + 1, 0).getDate();
  
    // Get the weekday of the first day of the current month (0 = Sunday, 6 = Saturday)
    const jsDay = new Date(year, month, 1).getDay();
  
    // Convert to Monday-first format (0 = Monday, 6 = Sunday)
    const firstDayOfMonth = (jsDay + 6) % 7;
  
    this.blankDays = Array(firstDayOfMonth).fill(0);
    this.daysInMonth = [];
  
    for (let i = 1; i <= totalDays; i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }
  

  private initializeDayData(): void {
    this.dayDataDict = {};

    this.items.forEach((item) => {
      item.dailyDatas?.forEach((dailyData) => {
        const dateKey = new Date(dailyData.date).toDateString();
        if (!this.dayDataDict[dateKey]) {
          this.dayDataDict[dateKey] = { positive: 0, negative: 0 };
        }
        if (item.positive) {
          this.dayDataDict[dateKey].positive += dailyData.count || 0;
        } else {
          this.dayDataDict[dateKey].negative += dailyData.count || 0;
        }
      });
    });
  }

  getPositivesDayCount(date: Date): string {
    const dateKey = date.toDateString();
    return  this.dayDataDict[dateKey]?.positive.toString();
  }

  getNegativeDayCount(date: Date): string {
    const dateKey = date.toDateString();
    return  this.dayDataDict[dateKey]?.negative.toString();
  }
}
