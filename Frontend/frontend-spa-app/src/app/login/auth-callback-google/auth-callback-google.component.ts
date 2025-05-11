import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import {
  CODE_STATE_KEY,
  CODE_VERIFIER_KEY,
} from '../../services/auth.constants';

@Component({
  selector: 'app-auth-callback-google',
  imports: [],
  templateUrl: './auth-callback-google.component.html',
  standalone: true,
})
export class AuthCallbackGoogleComponent {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthGoogleService,
    private router: Router,
  ) {}

  async ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    const storedState = sessionStorage.getItem(CODE_STATE_KEY);
    sessionStorage.removeItem(CODE_STATE_KEY);

    console.log('State received:', state);
    console.log('Stored state:', storedState);

    if (state !== storedState) {
      console.error('Invalid state');
      return;
    }

    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    sessionStorage.removeItem(CODE_VERIFIER_KEY);

    if (!code || !codeVerifier) {
      console.error('Missing code or verifier');
      return;
    }

    console.log('Code received:', code);
    console.log('Code verifier:', codeVerifier);

    this.auth.exchangeCodeForTokens(code, codeVerifier).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
