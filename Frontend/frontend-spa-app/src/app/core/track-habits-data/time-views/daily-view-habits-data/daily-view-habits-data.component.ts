import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddHabitComponent } from '../../../add-habit/add-habit.component';
import { DialogResult } from '../../../../shared/dialog-result.enum';
import { EditHabitComponent } from '../../../edit-habit/edit-habit.component';
import { DeleteHabitComponent } from '../../../delete-habit/delete-habit.component';
import { HabitDto } from '../../../../api-client/models/habit-dto';
import { HabitService } from '../../../../api-client/services';

interface HabitViewData {
  showMenu?: boolean;
}

type HabitData = HabitDto & HabitViewData;

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
    this.habitsApi
      .apiCoreHabitSetHabitsOrderPost({
        body: { habitsOrder: this.items.map((x) => x.id) },
      })
      .subscribe();
  }

  @Input() items: Array<HabitData> = [];
  @Input() date: Date = new Date();
  @Output() onClickHabit = new EventEmitter<{ habitId: string; date: Date }>();
  @Output() onHabitsChange = new EventEmitter<void>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private habitsApi: HabitService,
  ) {}

  clickHabit(habitId: string) {
    this.onClickHabit.emit({ habitId: habitId, date: this.date });
  }

  emitDataChange() {
    this.onHabitsChange.emit();
  }

  calculateDaysSince(dateStr: string): string {
    const lastDate = new Date(dateStr);
    const today = new Date();
    const timeDiff = today.getTime() - lastDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  onAddHabit() {
    const dialogRef = this.dialog.open(AddHabitComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DialogResult.SUCCESS) {
        this.onHabitsChange.emit();
      }
    });
  }

  edit(habitId: string) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const dialogRef = this.dialog.open(EditHabitComponent, {
      width: '350px',
      data: { habitId: habitId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DialogResult.SUCCESS) {
        this.onHabitsChange.emit();
      }
    });
  }

  remove(habitId: string, habitName: string) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const dialogRef = this.dialog.open(DeleteHabitComponent, {
      width: '350px',
      data: { habitId: habitId, habitName: habitName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DialogResult.SUCCESS) {
        this.onHabitsChange.emit();
      }
    });
  }
}
