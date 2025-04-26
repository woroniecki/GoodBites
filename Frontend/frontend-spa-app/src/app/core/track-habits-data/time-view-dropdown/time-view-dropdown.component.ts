import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeViewOption } from '../enums/time-view-option.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-view-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './time-view-dropdown.component.html',
  styleUrl: './time-view-dropdown.component.css',
  standalone: true,
})
export class TimeViewDropdownComponent implements OnInit {
  dropdownOptions: TimeViewOption[] = Object.values(TimeViewOption);

  @Input() selectedOption: TimeViewOption = TimeViewOption.Daily;
  @Output() optionChanged = new EventEmitter<TimeViewOption>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const viewParam = params.get('view')?.toLowerCase();
      if (
        viewParam &&
        Object.values(TimeViewOption)
          .map((v) => v.toLowerCase())
          .includes(viewParam)
      ) {
        this.selectedOption = Object.values(TimeViewOption).find(
          (v) => viewParam === v.toLowerCase(),
        ) as TimeViewOption;
        this.optionChanged.emit(this.selectedOption);
      }
    });
  }

  onOptionChange(newOption: TimeViewOption): void {
    this.selectedOption = newOption;
    this.optionChanged.emit(newOption);
    //close dropdown after click
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
