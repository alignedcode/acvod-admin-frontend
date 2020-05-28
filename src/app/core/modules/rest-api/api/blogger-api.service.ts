import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BASE_PATH } from '../injection-tokens';
import { BloggerDetails } from '../models/blogger-detais.model';
import { ContentType, RestService } from '../services/rest.service';

export enum BloggerApiRoute {
  DETAILS = '/api/admin/blogger/:bloggerId/details',
}

export enum BloggerApiRouteParam {
  BLOGGER_ID = ':bloggerId',
}

@Injectable()
export class BloggerApiService extends RestService {
  constructor(
    @Inject(BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
    authService: InternalAuthService,
  ) {
    super(authService);
  }

  public getDetails(bloggerId: string): Observable<BloggerDetails> {
    const route =
      this.basePath +
      BloggerApiRoute.DETAILS.replace(
        BloggerApiRouteParam.BLOGGER_ID,
        bloggerId,
      );

    return this.httpClient.get<BloggerDetails>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
