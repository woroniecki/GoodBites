import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { HabitService } from '../../api-client/services';

@Component({
  selector: 'app-edit-habit',
  imports: [DynamicFormComponent],
  templateUrl: './edit-habit.component.html',
  styleUrl: './edit-habit.component.css'
})
export class EditHabitComponent {
  loginFormConfig = [
    { label: 'Name', name: 'Name', type: 'text', required: true },
    {
      label: 'Positive',
      name: 'Positive',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
    { label: 'Icon', name: 'Icon', type: 'icon-picker', required: true },
    { label: 'Description', name: 'Description', type: 'text', required: true },
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private habitApi: HabitService,
  ) {}

  onSubmit(formData: { description: string; name: string; positive: boolean, icon: string }) {
    this.habitApi.apiCoreHabitAddHabitPost({ body: formData }).subscribe({
      next: () => {
        this.router.navigate(['/habits']);
      },
      error: (err) => {
        this.dialog.open(ErrorModalComponent, {
          data: {
            message: `Adding Failed.\n${err.message}`,
          },
          width: '400px',
        });
      },
    });
  }

  onDelete(){
    
  }
}
