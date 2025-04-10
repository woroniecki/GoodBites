import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetHabitsDataQueryResponse } from '../../../../api-client/models/get-habits-data-query-response';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-daily-view-habits-data',
  imports: [CommonModule, AngularSvgIconModule, DragDropModule],
  templateUrl: './daily-view-habits-data.component.html',
  styleUrl: './daily-view-habits-data.component.css',
  standalone: true,
})
export class DailyViewHabitsDataComponent {
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  @Input() items: Array<GetHabitsDataQueryResponse> = [];
  @Input() date: Date = new Date();
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  clickHabit(habitId: string) {
    this.onClickHabit.emit({habitId: habitId, date: this.date});
  }

  calculateDaysSince(dateStr: string): number {
    const lastDate = new Date(dateStr);
    const today = new Date();
    const timeDiff = today.getTime() - lastDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }
}
