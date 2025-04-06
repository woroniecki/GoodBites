import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HabitsListComponent } from './core/habits-list/habits-list.component';
import { AddHabitComponent } from './core/add-habit/add-habit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-habit', component: AddHabitComponent },
  { path: 'habits', component: HabitsListComponent },
  { path: '', component: LandingPageComponent } // Default route
];