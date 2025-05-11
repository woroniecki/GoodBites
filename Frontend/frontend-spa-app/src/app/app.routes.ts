import { Routes } from '@angular/router';
import { AuthCallbackGoogleComponent } from './login/auth-callback-google/auth-callback-google.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: 'auth/callback',
    component: AuthCallbackGoogleComponent,
  },
  { path: '**', component: MainComponent },
];
