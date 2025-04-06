import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from '../../api-client/services';
import { MatDialog } from '@angular/material/dialog';
import { GetHabitsListQueryResponse } from '../../api-client/models/get-habits-list-query-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-habits-data',
  imports: [CommonModule],
  templateUrl: './track-habits-data.component.html',
  styleUrl: './track-habits-data.component.css',
  standalone: true,
})
export class TrackHabitsDataComponent implements OnInit {
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

  onAddHabit() {
    this.router.navigate(['/habits/add']);
  }
}