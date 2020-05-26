import { HttpHeaders } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { NbAuthToken } from '@nebular/auth';
import { Subscription } from 'rxjs';

import { AuthService } from '@core/modules/auth/services/auth.service';

export enum HttpHeader {
  AUTHORIZATION = 'Authorization',
  CONTENT_TYPE = 'Content-Type',
}

export enum ContentType {
  JSON = 'application/json',
}

const AUTHORIZATION_HEADER_PREFIX = 'Bearer ';

export abstract class RestService implements OnDestroy {
  protected subscriptions: { [key: string]: Subscription } & {
    onTokenChange?: Subscription;
  };

  constructor(
    protected readonly authService: AuthService,
    private headers: HttpHeaders = new HttpHeaders(),
  ) {
    this.subscriptions = {
      onTokenChange: authService.onTokenChange().subscribe(
        (token) => this.onTokenChange(token),
        () => (this.headers = this.headers.delete(HttpHeader.AUTHORIZATION)),
      ),
    };

    this.headers.append(HttpHeader.CONTENT_TYPE, this.getDefaultContentType());
  }

  ngOnDestroy(): void {
    this.subscriptions.onTokenChange.unsubscribe();
  }

  // TODO: Move to a configuration dependency
  protected abstract getDefaultContentType(): string;

  protected onTokenChange(token: NbAuthToken) {
    this.headers = this.headers.set(
      HttpHeader.AUTHORIZATION,
      AUTHORIZATION_HEADER_PREFIX + token.getValue(),
    );
  }

  protected getHeaders(
    additionalHeaders: {
      [key: string]: string;
    } = {},
  ): HttpHeaders {
    let headers = this.headers;

    // tslint:disable-next-line: forin
    for (const header in additionalHeaders) {
      headers = headers.append(header, additionalHeaders[header]);
    }

    return headers;
  }
}
