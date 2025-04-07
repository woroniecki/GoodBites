import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monthly-view-habits-data',
  imports: [CommonModule],
  templateUrl: './monthly-view-habits-data.component.html',
  styleUrls: ['./monthly-view-habits-data.component.css'],
  standalone: true
})
export class MonthlyViewHabitsDataComponent {
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysInMonth: Date[] = [];
  blankDays: number[] = [];

  ngOnInit() {
    const year = 2025;
    const month = 3; // April (0-indexed)

    const jsDay = new Date(year, month, 1).getDay();
    const firstDayOfMonth = (jsDay + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();

    this.blankDays = Array(firstDayOfMonth).fill(0);
    this.daysInMonth = [];

    for (let i = 1; i <= totalDays; i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }
}

