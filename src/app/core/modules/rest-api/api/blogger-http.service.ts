import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../injection-tokens';
import { BloggerDto } from '../models/blogger.dto';
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
  ) {
    super();
  }

  public getBlogger(bloggerId: string): Observable<BloggerDto> {
    const route =
      this.basePath +
      ApiRoute.DETAILS.replace(RouteParam.BLOGGER_ID, bloggerId);

    return this.httpClient.get<BloggerDto>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
