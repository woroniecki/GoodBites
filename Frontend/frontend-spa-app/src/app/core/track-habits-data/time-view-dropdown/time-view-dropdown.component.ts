import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeViewOption } from '../enums/time-view-option.enum';

@Component({
  selector: 'app-time-view-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './time-view-dropdown.component.html',
  styleUrl: './time-view-dropdown.component.css',
  standalone: true
})
export class TimeViewDropdownComponent {
  dropdownOptions: TimeViewOption[] = Object.values(TimeViewOption).filter(option => option !== TimeViewOption.Yearly);
  
  @Input() selectedOption: TimeViewOption = TimeViewOption.Daily;
  @Output() optionChanged = new EventEmitter<TimeViewOption>();

  onOptionChange(newOption: TimeViewOption): void {
    this.selectedOption = newOption;
    this.optionChanged.emit(newOption);
    //close dropdown after click
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
