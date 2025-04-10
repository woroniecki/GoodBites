import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from '../../api-client/services';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GetHabitsListQueryResponse } from '../../api-client/models/get-habits-list-query-response';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-habits-list',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './habits-list.component.html',
  styleUrl: './habits-list.component.css',
  standalone: true,
})
export class HabitsListComponent implements OnInit {
  items: Array<GetHabitsListQueryResponse> = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private habitApi: HabitService,
  ) {}

  ngOnInit(): void {
    this.habitApi.apiCoreHabitGetHabitsGet$Json().subscribe({
          next: (data) => {
            this.items = data;
          },
          error: (err) => {
            console.log('Error loading habits:', err);
          },
        });
  }

  onClickHabit(habitId: string) {
    this.router.navigate(['habits/edit', habitId]);
  }

  onAddHabit() {
    this.router.navigate(['/habits/add']);
  }
}
