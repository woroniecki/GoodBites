import { Component } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { TrackHabitsDataComponent } from '../core/track-habits-data/track-habits-data.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [CommonModule, LandingPageComponent, TrackHabitsDataComponent],
  templateUrl: './main.component.html',
  standalone: true,
})
export class MainComponent {
  constructor(public authService: AuthService) {}
}
