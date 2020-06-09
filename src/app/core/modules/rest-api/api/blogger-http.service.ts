import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BACKEND_BASE_PATH } from '../backend-base-path.provider';
import { BloggerDto } from '../models/blogger.dto';
import { ContentType, HttpRestService } from '../services/http-rest.service';

enum ApiRoute {
  GET_BLOGGER = '/api/admin/blogger/:bloggerId',
}

enum RouteParam {
  BLOGGER_ID = ':bloggerId',
}

@Injectable()
export class BloggerHttpService extends HttpRestService {
  constructor(
    @Inject(BACKEND_BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
  ) {
    super();
  }

  public getBlogger(bloggerId: string): Observable<BloggerDto> {
    const route =
      this.basePath +
      ApiRoute.GET_BLOGGER.replace(RouteParam.BLOGGER_ID, bloggerId);

    return this.httpClient.get<BloggerDto>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
