import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

import { InternalAuthService } from '../services/internal-auth.service';

const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: InternalAuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      flatMap((token) => {
        request = request.clone({
          setHeaders: {
            Authorization: `${AUTHORIZATION_HEADER_PREFIX} ${token.getValue()}`,
          },
        });

        return next.handle(request);
      }),
    );
  }
}
