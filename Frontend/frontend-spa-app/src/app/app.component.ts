import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TrackHabitsDataComponent } from './core/track-habits-data/track-habits-data.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingPageComponent, TrackHabitsDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-spa-app';

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }
}
