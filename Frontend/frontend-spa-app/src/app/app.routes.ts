import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HabitsListComponent } from './core/habits-list/habits-list.component';
import { AddHabitComponent } from './core/add-habit/add-habit.component';
import { TrackHabitsDataComponent } from './core/track-habits-data/track-habits-data.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calendar', component: TrackHabitsDataComponent },
  { path: 'habits', component: HabitsListComponent },
  { path: 'habits/add', component: AddHabitComponent },
  { path: '', component: LandingPageComponent } // Default route
];