import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbAuthResult,
  NbAuthStrategy,
  NbAuthStrategyClass,
} from '@nebular/auth';
import { Observable, of } from 'rxjs';

import { NbOAuthBackendOptions } from '../models/nb-oauth-backend-options.model';

@Injectable()
export class NbOAuthBackendStrategy extends NbAuthStrategy {
  get responseType() {
    return this.getOption('authorize.responseType');
  }

  get clientAuthMethod() {
    return this.getOption('clientAuthMethod');
  }

  static setup(
    options: NbOAuthBackendOptions,
  ): [NbAuthStrategyClass, NbOAuthBackendOptions] {
    return [NbOAuthBackendStrategy, options];
  }

  constructor(protected http: HttpClient, protected route: ActivatedRoute) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    return of(new NbAuthResult(true));
  }

  logout(): Observable<NbAuthResult> {
    return of(new NbAuthResult(true));
  }

  register(data?: any): Observable<NbAuthResult> {
    throw new Error(
      '`register` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`',
    );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error(
      '`requestPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`',
    );
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    throw new Error(
      '`resetPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`',
    );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }

  protected parseHashAsQueryParams(hash: string): { [key: string]: string } {
    return hash
      ? hash.split('&').reduce((acc: any, part: string) => {
          const item = part.split('=');
          acc[item[0]] = decodeURIComponent(item[1]);
          return acc;
        }, {})
      : {};
  }

  protected urlEncodeParameters(params: any): string {
    return Object.keys(params)
      .map((k) => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
      })
      .join('&');
  }
}
