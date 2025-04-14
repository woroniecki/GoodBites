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

import { apiCoreHabitAddHabitPost } from '../fn/habit/api-core-habit-add-habit-post';
import { ApiCoreHabitAddHabitPost$Params } from '../fn/habit/api-core-habit-add-habit-post';
import { apiCoreHabitEditHabitPost } from '../fn/habit/api-core-habit-edit-habit-post';
import { ApiCoreHabitEditHabitPost$Params } from '../fn/habit/api-core-habit-edit-habit-post';
import { apiCoreHabitGetHabitGet$Json } from '../fn/habit/api-core-habit-get-habit-get-json';
import { ApiCoreHabitGetHabitGet$Json$Params } from '../fn/habit/api-core-habit-get-habit-get-json';
import { apiCoreHabitGetHabitGet$Plain } from '../fn/habit/api-core-habit-get-habit-get-plain';
import { ApiCoreHabitGetHabitGet$Plain$Params } from '../fn/habit/api-core-habit-get-habit-get-plain';
import { apiCoreHabitRemoveHabitDelete } from '../fn/habit/api-core-habit-remove-habit-delete';
import { ApiCoreHabitRemoveHabitDelete$Params } from '../fn/habit/api-core-habit-remove-habit-delete';
import { HabitDto } from '../models/habit-dto';

@Injectable({ providedIn: 'root' })
export class HabitService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiCoreHabitGetHabitGet()` */
  static readonly ApiCoreHabitGetHabitGetPath = '/api/core/Habit/get-habit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCoreHabitGetHabitGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCoreHabitGetHabitGet$Plain$Response(params?: ApiCoreHabitGetHabitGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<HabitDto>> {
    return apiCoreHabitGetHabitGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCoreHabitGetHabitGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCoreHabitGetHabitGet$Plain(params?: ApiCoreHabitGetHabitGet$Plain$Params, context?: HttpContext): Observable<HabitDto> {
    return this.apiCoreHabitGetHabitGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<HabitDto>): HabitDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCoreHabitGetHabitGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCoreHabitGetHabitGet$Json$Response(params?: ApiCoreHabitGetHabitGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<HabitDto>> {
    return apiCoreHabitGetHabitGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCoreHabitGetHabitGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCoreHabitGetHabitGet$Json(params?: ApiCoreHabitGetHabitGet$Json$Params, context?: HttpContext): Observable<HabitDto> {
    return this.apiCoreHabitGetHabitGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<HabitDto>): HabitDto => r.body)
    );
  }

  /** Path part for operation `apiCoreHabitAddHabitPost()` */
  static readonly ApiCoreHabitAddHabitPostPath = '/api/core/Habit/add-habit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCoreHabitAddHabitPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCoreHabitAddHabitPost$Response(params: ApiCoreHabitAddHabitPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiCoreHabitAddHabitPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCoreHabitAddHabitPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCoreHabitAddHabitPost(params: ApiCoreHabitAddHabitPost$Params, context?: HttpContext): Observable<void> {
    return this.apiCoreHabitAddHabitPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiCoreHabitEditHabitPost()` */
  static readonly ApiCoreHabitEditHabitPostPath = '/api/core/Habit/edit-habit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCoreHabitEditHabitPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCoreHabitEditHabitPost$Response(params: ApiCoreHabitEditHabitPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiCoreHabitEditHabitPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCoreHabitEditHabitPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCoreHabitEditHabitPost(params: ApiCoreHabitEditHabitPost$Params, context?: HttpContext): Observable<void> {
    return this.apiCoreHabitEditHabitPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiCoreHabitRemoveHabitDelete()` */
  static readonly ApiCoreHabitRemoveHabitDeletePath = '/api/core/Habit/remove-habit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCoreHabitRemoveHabitDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCoreHabitRemoveHabitDelete$Response(params: ApiCoreHabitRemoveHabitDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiCoreHabitRemoveHabitDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCoreHabitRemoveHabitDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCoreHabitRemoveHabitDelete(params: ApiCoreHabitRemoveHabitDelete$Params, context?: HttpContext): Observable<void> {
    return this.apiCoreHabitRemoveHabitDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
