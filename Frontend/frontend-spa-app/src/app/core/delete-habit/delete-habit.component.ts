import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HabitService } from '../../api-client/services';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-delete-habit',
  imports: [],
  templateUrl: './delete-habit.component.html',
  styleUrl: './delete-habit.component.css',
  standalone: true,
})
export class DeleteHabitComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteHabitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { habitId: string, habitName: string },
    private dialog: MatDialog,
    private habitApi: HabitService,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.habitApi
      .apiCoreHabitRemoveHabitDelete({ body: { id: this.data.habitId } })
      .subscribe({
        next: () => {
          this.close();
        },
        error: (err) => {
          this.dialog.open(ErrorModalComponent, {
            data: {
              message: `Deleting Failed.\n${err.message}`,
            },
            width: '400px',
          });
        },
      });
  }
}
