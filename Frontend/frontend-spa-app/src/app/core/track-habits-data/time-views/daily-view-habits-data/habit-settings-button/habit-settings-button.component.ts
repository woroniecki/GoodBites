import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddHabitComponent } from '../../../../add-habit/add-habit.component';
import { EditHabitComponent } from '../../../../edit-habit/edit-habit.component';

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

  edit() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.dialog.open(EditHabitComponent, {
      width: '350px',
      data: { habitId: this.habitId }
    });
  }
  
  remove() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
