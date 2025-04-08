import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { Icons } from '../icons.enum';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IconPickerComponent
  ],
})
export class DynamicFormComponent {
  allIcons = Object.values(Icons);
  @Input() formConfig: {
    label: string;
    name: string;
    type: string;
    required: boolean;
    defaultValue?: any; // Add defaultValue property
  }[] = [];
  @Input() submitButtonLabel: string = 'Submit';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const formControls = this.formConfig.reduce(
      (controls: { [key: string]: unknown }, field) => {
        controls[field.name] = field.required
          ? [field.defaultValue || null, Validators.required]
          : [field.defaultValue || null]; // Use defaultValue if provided
        return controls;
      },
      {},
    );
    this.form = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}
