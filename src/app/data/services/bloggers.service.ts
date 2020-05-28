import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JwtPayload } from '@core/modules/auth/models/jwt-payload.model';
import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BloggerHttpService } from '@core/modules/rest-api/api/blogger-http.service';
import { BloggerDetails } from '@core/modules/rest-api/models/blogger-detais.model';
import { Blogger } from '@data/models/blogger.model';

@Injectable()
export class BloggersService {
  onDetailsChange: BehaviorSubject<BloggerDetails> = new BehaviorSubject(null);

  constructor(
    private readonly bloggersApiService: BloggerHttpService,
    private readonly authService: InternalAuthService,
  ) {}

  getBlogger(): Observable<Blogger> {
    return this.authService.getToken().pipe(
      map((token) => {
        const {
          id,
          accountDetails: { email, firstName, lastName },
        } = token.getPayload() as JwtPayload;

        return { id, email, firstName, lastName };
      }),
    );
  }

  getDetails(bloggerId: string): Observable<BloggerDetails> {
    return this.bloggersApiService.getDetails(bloggerId).pipe(
      tap((details) => {
        this.onDetailsChange.next(details);
      }),
    );
  }
}
