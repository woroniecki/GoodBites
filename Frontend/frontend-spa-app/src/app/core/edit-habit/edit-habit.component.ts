import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { HabitService } from '../../api-client/services';
import { DialogResult } from '../../shared/dialog-result.enum';
import { HabitDto } from '../../api-client/models/habit-dto';
import { habitColourOptionForm } from '../shared/habit-colour-options';
import { HabitColourEnum } from '../../api-client/models';

@Component({
  selector: 'app-edit-habit',
  imports: [DynamicFormComponent],
  templateUrl: './edit-habit.component.html',
  styleUrl: './edit-habit.component.css',
})
export class EditHabitComponent implements OnInit {
  loginFormConfig = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    {
      label: 'Positive',
      name: 'positive',
      type: 'toggle',
      required: true,
      defaultValue: true,
    },
    habitColourOptionForm,
    { label: 'Icon', name: 'icon', type: 'icon-picker', required: true },
  ];

  habitId: string = '';
  habit: HabitDto = {} as HabitDto;

  constructor(
    public dialogRef: MatDialogRef<EditHabitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { habitId: string },
    private dialog: MatDialog,
    private habitApi: HabitService,
  ) {}

  ngOnInit(): void {
    this.habitId = this.data.habitId;

    this.habitApi
      .apiCoreHabitGetHabitGet$Json({
        habitId: this.habitId,
      })
      .subscribe({
        next: (data) => {
          this.habit = data;
        },
        error: (err) => {
          console.log('Error loading habits:', err);
        },
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(formData: {
    description: string;
    name: string;
    positive: boolean;
    colour: HabitColourEnum;
    icon: string;
    id: string;
  }) {
    formData['id'] = this.habitId;
    this.habitApi.apiCoreHabitEditHabitPost({ body: formData }).subscribe({
      next: () => {
        this.dialogRef.close(DialogResult.SUCCESS);
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
}
