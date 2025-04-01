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

import { apiUsermanagementAccountLoginPost$Json } from '../fn/account/api-usermanagement-account-login-post-json';
import { ApiUsermanagementAccountLoginPost$Json$Params } from '../fn/account/api-usermanagement-account-login-post-json';
import { apiUsermanagementAccountLoginPost$Plain } from '../fn/account/api-usermanagement-account-login-post-plain';
import { ApiUsermanagementAccountLoginPost$Plain$Params } from '../fn/account/api-usermanagement-account-login-post-plain';
import { apiUsermanagementAccountRefreshLoginPost$Json } from '../fn/account/api-usermanagement-account-refresh-login-post-json';
import { ApiUsermanagementAccountRefreshLoginPost$Json$Params } from '../fn/account/api-usermanagement-account-refresh-login-post-json';
import { apiUsermanagementAccountRefreshLoginPost$Plain } from '../fn/account/api-usermanagement-account-refresh-login-post-plain';
import { ApiUsermanagementAccountRefreshLoginPost$Plain$Params } from '../fn/account/api-usermanagement-account-refresh-login-post-plain';
import { apiUsermanagementAccountRegisterPost } from '../fn/account/api-usermanagement-account-register-post';
import { ApiUsermanagementAccountRegisterPost$Params } from '../fn/account/api-usermanagement-account-register-post';

@Injectable({ providedIn: 'root' })
export class AccountService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiUsermanagementAccountRegisterPost()` */
  static readonly ApiUsermanagementAccountRegisterPostPath = '/api/usermanagement/Account/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsermanagementAccountRegisterPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsermanagementAccountRegisterPost$Response(params: ApiUsermanagementAccountRegisterPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiUsermanagementAccountRegisterPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsermanagementAccountRegisterPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsermanagementAccountRegisterPost(params: ApiUsermanagementAccountRegisterPost$Params, context?: HttpContext): Observable<void> {
    return this.apiUsermanagementAccountRegisterPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiUsermanagementAccountLoginPost()` */
  static readonly ApiUsermanagementAccountLoginPostPath = '/api/usermanagement/Account/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsermanagementAccountLoginPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsermanagementAccountLoginPost$Plain$Response(params: ApiUsermanagementAccountLoginPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return apiUsermanagementAccountLoginPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsermanagementAccountLoginPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsermanagementAccountLoginPost$Plain(params: ApiUsermanagementAccountLoginPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.apiUsermanagementAccountLoginPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsermanagementAccountLoginPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsermanagementAccountLoginPost$Json$Response(params: ApiUsermanagementAccountLoginPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return apiUsermanagementAccountLoginPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsermanagementAccountLoginPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsermanagementAccountLoginPost$Json(params: ApiUsermanagementAccountLoginPost$Json$Params, context?: HttpContext): Observable<string> {
    return this.apiUsermanagementAccountLoginPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `apiUsermanagementAccountRefreshLoginPost()` */
  static readonly ApiUsermanagementAccountRefreshLoginPostPath = '/api/usermanagement/Account/refresh-login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsermanagementAccountRefreshLoginPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsermanagementAccountRefreshLoginPost$Plain$Response(params?: ApiUsermanagementAccountRefreshLoginPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return apiUsermanagementAccountRefreshLoginPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsermanagementAccountRefreshLoginPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsermanagementAccountRefreshLoginPost$Plain(params?: ApiUsermanagementAccountRefreshLoginPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.apiUsermanagementAccountRefreshLoginPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsermanagementAccountRefreshLoginPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsermanagementAccountRefreshLoginPost$Json$Response(params?: ApiUsermanagementAccountRefreshLoginPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return apiUsermanagementAccountRefreshLoginPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsermanagementAccountRefreshLoginPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsermanagementAccountRefreshLoginPost$Json(params?: ApiUsermanagementAccountRefreshLoginPost$Json$Params, context?: HttpContext): Observable<string> {
    return this.apiUsermanagementAccountRefreshLoginPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
