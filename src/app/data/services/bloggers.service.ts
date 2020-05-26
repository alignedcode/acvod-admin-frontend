import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JwtPayload } from '@core/modules/auth/models/jwt-payload.model';
import { AuthService } from '@core/modules/auth/services/auth.service';
import { BloggerApiService } from '@core/modules/rest-api/api/blogger-api.service';
import { BloggerDetails } from '@core/modules/rest-api/models/blogger-detais.model';
import { Blogger } from '@data/models/blogger.model';

@Injectable()
export class BloggersService {
  onDetailsChange: BehaviorSubject<BloggerDetails> = new BehaviorSubject(null);

  constructor(
    private readonly bloggersApiService: BloggerApiService,
    private readonly authService: AuthService,
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
