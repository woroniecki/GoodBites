/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiCoreHealthCheckHealthCheckGet } from '../fn/health-check/api-core-health-check-health-check-get';
import { ApiCoreHealthCheckHealthCheckGet$Params } from '../fn/health-check/api-core-health-check-health-check-get';

@Injectable({ providedIn: 'root' })
export class HealthCheckService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiCoreHealthCheckHealthCheckGet()` */
  static readonly ApiCoreHealthCheckHealthCheckGetPath = '/api/core/HealthCheck/health-check';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCoreHealthCheckHealthCheckGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCoreHealthCheckHealthCheckGet$Response(params?: ApiCoreHealthCheckHealthCheckGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiCoreHealthCheckHealthCheckGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCoreHealthCheckHealthCheckGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCoreHealthCheckHealthCheckGet(params?: ApiCoreHealthCheckHealthCheckGet$Params, context?: HttpContext): Observable<void> {
    return this.apiCoreHealthCheckHealthCheckGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
