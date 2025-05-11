import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthGoogleService } from '../services/auth-google.service';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public authGoogle: AuthGoogleService,
  ) {}

  onRegister() {
    this.dialog.open(RegisterComponent, {
      width: '350px',
    });
  }

  onLogin() {
    this.dialog.open(LoginComponent, {
      width: '350px',
    });
  }

  async onSignIn() {
    await this.triggerGoogleSignIn();
  }

  private async triggerGoogleSignIn(): Promise<void> {
    await this.authGoogle.triggerGoogleSignIn();
  }
}
