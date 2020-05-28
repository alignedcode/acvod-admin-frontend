import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BASE_PATH } from '../injection-tokens';
import { BloggerDetails } from '../models/blogger-detais.model';
import { ContentType, HttpRestService } from '../services/http-rest.service';

enum ApiRoute {
  DETAILS = '/api/admin/blogger/:bloggerId/details',
}

enum RouteParam {
  BLOGGER_ID = ':bloggerId',
}

@Injectable()
export class BloggerHttpService extends HttpRestService {
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
      ApiRoute.DETAILS.replace(RouteParam.BLOGGER_ID, bloggerId);

    return this.httpClient.get<BloggerDetails>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
