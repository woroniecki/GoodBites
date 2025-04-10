import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EditHabitComponent } from '../../../../edit-habit/edit-habit.component';
import { DeleteHabitComponent } from '../../../../delete-habit/delete-habit.component';
import { DialogResult } from '../../../../../shared/dialog-result.enum';

@Component({
  selector: 'app-habit-settings-button',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './habit-settings-button.component.html',
  styleUrl: './habit-settings-button.component.css',
  standalone: true
})
export class HabitSettingsButtonComponent {
  constructor(private dialog: MatDialog) {}

  @Input() habitId: string = "";
  @Input() habitName: string = "";
  @Output() onDataChange = new EventEmitter<void>();

  edit() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const dialogRef = this.dialog.open(EditHabitComponent, {
      width: '350px',
      data: { habitId: this.habitId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === DialogResult.SUCCESS){
        this.onDataChange.emit();
      }
    });
  }
  
  remove() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const dialogRef = this.dialog.open(DeleteHabitComponent, {
      width: '350px',
      data: { habitId: this.habitId, habitName: this.habitName }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === DialogResult.SUCCESS){
        this.onDataChange.emit();
      }
    });
  }
}
