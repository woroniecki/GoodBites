import { Injectable } from '@angular/core';
import { AccountService } from '../api-client/services';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';

  public username: string | null = null;

  constructor(private apiAccountService: AccountService) {}

  loginWithCredentials(credentials: {
    username: string;
    password: string;
  }): Observable<string> {
    return this.apiAccountService
      .apiUsermanagementAccountLoginPost$Json({
        body: credentials,
      })
      .pipe(
        tap((token) => {
          this.setUser(token);
        }),
      );
  }

  tryToLoginWithRefreshToken(): Promise<void> {
    return new Promise((resolve) => {
      this.apiAccountService
        .apiUsermanagementAccountRefreshLoginPost$Json()
        .subscribe({
          next: (token) => {
            this.setUser(token);
            resolve();
          },
          error: () => {
            resolve();
          },
        });
    });
  }

  logout(): void {
    this.apiAccountService.apiUsermanagementAccountLogoutPost().subscribe({
      next: () => {
        this.username = null;
      },
      error: () => {},
    });
  }

  public setUser(accessToken: string) {
    document.cookie = `${this.ACCESS_TOKEN_KEY}=${accessToken}; path=/;`;
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    this.username = payload.username;
  }
}
