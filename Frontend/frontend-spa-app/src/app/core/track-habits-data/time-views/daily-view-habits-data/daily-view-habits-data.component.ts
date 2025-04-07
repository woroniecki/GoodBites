import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetHabitsDataQueryResponse } from '../../../../api-client/models/get-habits-data-query-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-view-habits-data',
  imports: [CommonModule],
  templateUrl: './daily-view-habits-data.component.html',
  styleUrl: './daily-view-habits-data.component.css',
  standalone: true,
})
export class DailyViewHabitsDataComponent {
  @Input() items: Array<GetHabitsDataQueryResponse> = [];
  @Input() date: string = ''; // Date in YYYY-MM-DD format
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: string }>();

  clickHabit(habitId: string) {
    this.onClickHabit.emit({habitId: habitId, date: this.date});
  }
}
