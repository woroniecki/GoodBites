import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  title = 'frontend-spa-app';

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
  ) {}

  onRegister() {
    this.dialog.open(RegisterComponent, {
      width: '350px'
    });
  }

  onLogin() {
    this.dialog.open(LoginComponent, {
      width: '350px'
    });
  }
}
