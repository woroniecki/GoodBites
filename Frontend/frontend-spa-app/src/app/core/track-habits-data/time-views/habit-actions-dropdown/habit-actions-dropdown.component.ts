import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditHabitComponent } from '../../../edit-habit/edit-habit.component';
import { DialogResult } from '../../../../shared/dialog-result.enum';
import { DeleteHabitComponent } from '../../../delete-habit/delete-habit.component';
import { HabitDto } from '../../../../api-client/models/habit-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-actions-dropdown',
  imports: [CommonModule],
  templateUrl: './habit-actions-dropdown.component.html',
  styleUrl: './habit-actions-dropdown.component.css',
})
export class HabitActionsDropdownComponent {
  @Input() item: HabitDto = {} as HabitDto;
  @Output() onHabitsChange = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

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
