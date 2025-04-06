import { Component, OnInit } from '@angular/core';
import { HabitDataService } from '../../api-client/services';
import { CommonModule } from '@angular/common';
import { GetHabitsDataQueryResponse } from '../../api-client/models/get-habits-data-query-response';

@Component({
  selector: 'app-track-habits-data',
  imports: [CommonModule],
  templateUrl: './track-habits-data.component.html',
  styleUrl: './track-habits-data.component.css',
  standalone: true,
})
export class TrackHabitsDataComponent implements OnInit {
  items: Array<GetHabitsDataQueryResponse> = [];

  constructor(private habitsDataApi: HabitDataService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.habitsDataApi
      .apiCoreHabitDataGetHabitsDataGet$Json({
        date: today,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.items = data; // Assign the response to the items array
        },
        error: (err) => {
          console.log('Error loading habits daily data:', err);
        },
      });
  }

  clickHabit(habitId: string) {
    const date = new Date().toISOString().split('T')[0];

    if (this.items.find(item => item.id === habitId)?.dailyDatas?.length === 0){
      this.habitsDataApi
      .apiCoreHabitDataAddHabitDataPost({ body: { date, habitId } })
      .subscribe(() => {
        this.items.find(item => item.id === habitId)?.dailyDatas.push({
          date: date,
          count: 1
        });
      });
    } else {
      this.habitsDataApi.apiCoreHabitDataClearHabitDataPost({ body: { date, habitId } })
      .subscribe(() => {
        this.items.find(item => item.id === habitId)!.dailyDatas = [];
      });
    }

  }
}
