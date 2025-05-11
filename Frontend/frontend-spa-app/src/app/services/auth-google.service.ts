import { Injectable } from '@angular/core';
import { AccountService } from '../api-client/services';
import { ConfigService } from './config.service';
import { CODE_STATE_KEY, CODE_VERIFIER_KEY } from './auth.constants';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  constructor(
    private apiAccountService: AccountService,
    private config: ConfigService,
    private auth: AuthService,
  ) {}

  public async triggerGoogleSignIn(): Promise<void> {
    const clientId = this.config.googleClientId;
    const redirectUri = `${this.config.appUrl}/auth/callback`;
    const scope = 'openid profile email';
    const responseType = 'code';
    const state = this.generateRandomString(16);
    const codeVerifier = this.generateRandomString(128);

    // Store the verifier for the token exchange step
    sessionStorage.setItem(CODE_STATE_KEY, state);
    sessionStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', responseType);
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    window.location.href = authUrl.toString();
  }

  private generateRandomString(length: number): string {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    randomValues.forEach((v) => (text += possible.charAt(v % possible.length)));
    return text;
  }

  /** SHA-256 hash + Base64-URL-encode */
  private async generateCodeChallenge(verifier: string): Promise<string> {
    // 1) hash the verifier
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);

    // 2) convert ArrayBuffer to byte array
    const bytes = new Uint8Array(digest);

    // 3) Base64-URL-encode
    let str = '';
    bytes.forEach((b) => (str += String.fromCharCode(b)));
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  public exchangeCodeForTokens(
    code: string,
    codeVerifier: string,
  ): Observable<string> {
    return this.apiAccountService
      .apiUsermanagementAccountGoogleSignInPost$Json({
        body: {
          code,
          codeVerifier,
        },
      })
      .pipe(
        tap((res) => {
          this.auth.setUser(res);
        }),
      );
  }
}
