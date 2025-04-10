import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { HabitService } from '../../api-client/services';
import { GetHabitsListQueryResponse } from '../../api-client/models/get-habits-list-query-response';

@Component({
  selector: 'app-edit-habit',
  imports: [DynamicFormComponent],
  templateUrl: './edit-habit.component.html',
  styleUrl: './edit-habit.component.css'
})
export class EditHabitComponent implements OnInit {
  loginFormConfig = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    {
      label: 'Positive',
      name: 'positive',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
    { label: 'Icon', name: 'icon', type: 'icon-picker', required: true },
    { label: 'Description', name: 'description', type: 'text', required: true },
  ];

  habitId: string = '';
  habit: GetHabitsListQueryResponse = {} as GetHabitsListQueryResponse;

  constructor(
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { habitId: string },
    private dialog: MatDialog,
    private habitApi: HabitService
  ) {}

  ngOnInit(): void {
    this.habitId = this.data.habitId;

    this.habitApi.apiCoreHabitGetHabitsGet$Json().subscribe({
      next: (data) => {
        this.habit = data.find((habit) => habit.id === this.data.habitId) as GetHabitsListQueryResponse;
      },
      error: (err) => {
        console.log('Error loading habits:', err);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(formData: { description: string; name: string; positive: boolean, icon: string, id: string }) {
    formData['id'] = this.habitId;
    this.habitApi.apiCoreHabitEditHabitPost({ body: formData }).subscribe({
      next: () => {
        this.close();
      },
      error: (err) => {
        this.dialog.open(ErrorModalComponent, {
          data: {
            message: `Editing Failed.\n${err.message}`,
          },
          width: '400px',
        });
      },
    });
  }

  onDelete(){
    this.habitApi.apiCoreHabitRemoveHabitDelete({ body: { id: this.habitId} }).subscribe({
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
