import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeViewOption } from '../enums/time-view-option.enum';

@Component({
  selector: 'app-time-date-selection',
  imports: [],
  templateUrl: './time-date-selection.component.html',
  styleUrl: './time-date-selection.component.css',
  standalone: true,
})
export class TimeDateSelectionComponent implements OnInit {
  printValue: string = '';

  @Input() _selectedOption: TimeViewOption = TimeViewOption.Daily;
  @Input()
  set selectedOption(value: TimeViewOption) {
    this._selectedOption = value;
    this.initDates();
  }
  get selectedOption(): TimeViewOption {
    return this._selectedOption;
  }

  private dateFrom: Date = new Date();

  @Output() dateChanged = new EventEmitter<{ from: Date; to: Date }>();

  ngOnInit(): void {
    this.updatePrintedDate();
  }

  updatePrintedDate() {
    switch (this.selectedOption) {
      case TimeViewOption.Daily:
        {
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          if (this.dateFrom.toDateString() === today.toDateString()) {
            this.printValue = 'today';
          } else if (
            this.dateFrom.toDateString() === yesterday.toDateString()
          ) {
            this.printValue = 'yesterday';
          } else if (this.dateFrom.toDateString() === tomorrow.toDateString()) {
            this.printValue = 'tomorrow';
          } else {
            this.printValue = this.dateFrom
              .toLocaleDateString('en-GB')
              .replace(/\//g, '.');
          }
        }
        break;
      case TimeViewOption.Weekly:
        {
          const firstDayOfWeek = new Date(this.dateFrom);
          const lastDayOfWeek = new Date(this.dateFrom);

          // Adjust to the first day of the week (Monday)
          const day = firstDayOfWeek.getDay();
          const diffToMonday = (day === 0 ? -6 : 1) - day; // Adjust for Sunday as 0
          firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diffToMonday);

          // Adjust to the last day of the week (Sunday)
          lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

          this.printValue = `${firstDayOfWeek
            .toLocaleDateString('en-GB')
            .replace(/\//g, '.')} - ${lastDayOfWeek
            .toLocaleDateString('en-GB')
            .replace(/\//g, '.')}`;
        }
        break;
      case TimeViewOption.Monthly:
        {
          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
          this.printValue = monthNames[this.dateFrom.getMonth()];
        }
        break;
      case TimeViewOption.Yearly:
        {
          this.printValue = this.dateFrom.getFullYear().toString();
        }
        break;
    }
  }

  initDates(): void {
    let from: Date;
    let to: Date;

    const today = new Date();

    switch (this._selectedOption) {
      case TimeViewOption.Daily:
        from = new Date(today);
        to = new Date(today);
        break;

      case TimeViewOption.Weekly:
        {
          from = new Date(today);
          const day = from.getDay();
          const diffToMonday = (day === 0 ? -6 : 1) - day;
          from.setDate(from.getDate() + diffToMonday);

          to = new Date(from);
          to.setDate(from.getDate() + 6);
        }
        break;

      case TimeViewOption.Monthly:
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case TimeViewOption.Yearly:
        from = new Date(today.getFullYear(), 0, 1);
        to = new Date(today.getFullYear(), 11, 31);
        break;
    }

    this.dateFrom = from;
    this.updatePrintedDate();
    this.dateChanged.emit({ from, to });
  }

  moveDate(forward: boolean) {
    const from = new Date(this.dateFrom); // clone to avoid mutating parent input
    let to: Date;

    switch (this.selectedOption) {
      case TimeViewOption.Daily:
        from.setDate(from.getDate() + (forward ? 1 : -1));
        to = new Date(from); // same as from
        break;

      case TimeViewOption.Weekly:
        from.setDate(from.getDate() + (forward ? 7 : -7));
        to = new Date(from);
        to.setDate(from.getDate() + 6); // full week
        break;

      case TimeViewOption.Monthly:
        from.setMonth(from.getMonth() + (forward ? 1 : -1));
        to = new Date(from.getFullYear(), from.getMonth() + 1, 0); // last day of the new month
        break;

      case TimeViewOption.Yearly:
        from.setFullYear(from.getFullYear() + (forward ? 1 : -1));
        to = new Date(from.getFullYear(), 11, 31); // end of the year
        break;
    }

    this.dateFrom = from;

    this.updatePrintedDate();
    this.dateChanged.emit({ from, to });
  }
}
