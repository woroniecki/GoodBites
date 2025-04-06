import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { credentialsInterceptor } from './credential.interceptor';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
    provideAppInitializer(() => {
      const initAuth = ((authService: AuthService) => {
        return () => {
          return authService.tryToLoginWithRefreshToken();
        };
      })(inject(AuthService));
      return initAuth();
    })]
};
