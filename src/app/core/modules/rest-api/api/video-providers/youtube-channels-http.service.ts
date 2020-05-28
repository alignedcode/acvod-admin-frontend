import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BASE_PATH } from '../../injection-tokens';
import { YouTubeChannel } from '../../models/video-providers/youtube/youtube-channel.model';
import { ContentType, HttpRestService } from '../../services/http-rest.service';

enum ApiRoute {
  AUTH = '/api/admin/youtube/auth',
  GET_CHANNELS = '/api/admin/blogger/:bloggerId/youtube/channel',
  REMOVE_CHANNEL = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId',
}

enum RouteParam {
  BLOGGER_ID = ':bloggerId',
  CHANNEL_ID = ':channelId',
}

enum RouteQueryParam {
  BLOGGER_ID = 'bloggerId',
  REDIRECT_URI = 'redirectUri',
}

@Injectable()
export class YouTubeChannelsHttpService extends HttpRestService {
  constructor(
    @Inject(BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
    authService: InternalAuthService,
  ) {
    super(authService);
  }

  getAutheticationUri(bloggerId: string, redirectURI: string): string {
    const uriQueries = `?${RouteQueryParam.BLOGGER_ID}=${bloggerId}&${
      RouteQueryParam.REDIRECT_URI
    }=${encodeURIComponent(redirectURI)}`;

    return `${this.basePath}${ApiRoute.AUTH}${uriQueries}`;
  }

  getChannels(bloggerId: string): Observable<YouTubeChannel[]> {
    const route =
      this.basePath +
      ApiRoute.GET_CHANNELS.replace(RouteParam.BLOGGER_ID, bloggerId);

    return this.httpClient.get<any>(route, {
      headers: this.getHeaders(),
    });
  }

  removeChannel(bloggerId: string, channelId: string): Observable<any> {
    const route =
      this.basePath +
      ApiRoute.REMOVE_CHANNEL.replace(RouteParam.BLOGGER_ID, bloggerId).replace(
        RouteParam.CHANNEL_ID,
        channelId,
      );

    return this.httpClient.delete<any>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
