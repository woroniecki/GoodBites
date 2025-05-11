import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config | null = null;

  setConfig(config: Config): void {
    this.config = config;
  }

  get apiUrl(): string {
    return this.config?.apiBaseUrl || 'fallback-url';
  }

  get appUrl(): string {
    return this.config?.appBaseUrl || 'fallback-url';
  }

  get googleClientId(): string {
    return this.config?.googleClientId || '';
  }

  get appName(): string {
    return this.config?.appName || 'fallback-name';
  }
}

interface Config {
  apiBaseUrl: string;
  appBaseUrl: string;
  appName: string;
  googleClientId: string;
}
