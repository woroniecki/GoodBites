import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-dropdown',
  imports: [],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.css'
})
export class UserDropdownComponent {
  constructor(
    public authService: AuthService
  ) {
  }

  onLogout() {
    this.authService.logout();
  }
}
