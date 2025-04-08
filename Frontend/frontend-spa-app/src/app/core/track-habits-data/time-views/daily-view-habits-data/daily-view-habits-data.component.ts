import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetHabitsDataQueryResponse } from '../../../../api-client/models/get-habits-data-query-response';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-daily-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './daily-view-habits-data.component.html',
  styleUrl: './daily-view-habits-data.component.css',
  standalone: true,
})
export class DailyViewHabitsDataComponent {
  @Input() items: Array<GetHabitsDataQueryResponse> = [];
  @Input() date: Date = new Date();
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  clickHabit(habitId: string) {
    this.onClickHabit.emit({habitId: habitId, date: this.date});
  }
}
