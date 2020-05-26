import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '@core/modules/auth/services/auth.service';
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
    protected httpClient: HttpClient,
    authService: AuthService,
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

    return this.httpClient.get<any>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
