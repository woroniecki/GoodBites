/* tslint:disable */

/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Injectable } from '@angular/core';
import { ConfigService } from '../services/config.servic';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string;
  constructor(configService: ConfigService) {
    this.rootUrl = configService.apiUrl;
  }
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
