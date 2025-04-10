import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetHabitsDataQueryResponse } from '../../../../api-client/models/get-habits-data-query-response';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HabitSettingsButtonComponent } from './habit-settings-button/habit-settings-button.component';
import { MatDialog } from '@angular/material/dialog';
import { AddHabitComponent } from '../../../add-habit/add-habit.component';

interface HabitViewData {
  showMenu?: boolean;
}

type HabitData = GetHabitsDataQueryResponse & HabitViewData;

@Component({
  selector: 'app-daily-view-habits-data',
  imports: [
    CommonModule,
    AngularSvgIconModule,
    DragDropModule,
    HabitSettingsButtonComponent,
  ],
  templateUrl: './daily-view-habits-data.component.html',
  styleUrl: './daily-view-habits-data.component.css',
  standalone: true,
})
export class DailyViewHabitsDataComponent {
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  @Input() items: Array<HabitData> = [];
  @Input() date: Date = new Date();
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  clickHabit(habitId: string) {
    this.onClickHabit.emit({ habitId: habitId, date: this.date });
  }

  calculateDaysSince(dateStr: string): string {
    const lastDate = new Date(dateStr);
    const today = new Date();
    const timeDiff = today.getTime() - lastDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  onAddHabit() {
    this.dialog.open(AddHabitComponent, {
          width: '350px'
        });
  }
}
