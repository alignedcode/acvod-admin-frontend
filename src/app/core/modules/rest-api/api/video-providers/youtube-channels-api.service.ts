import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BASE_PATH } from '../../injection-tokens';
import { YouTubeChannel } from '../../models/video-providers/youtube/youtube-channel.model';
import { ContentType, RestService } from '../../services/rest.service';

enum ChannelsApiRoute {
  AUTH = '/api/admin/youtube/auth',
  GET_CHANNELS = '/api/admin/blogger/:bloggerId/youtube/channel',
  REMOVE_CHANNEL = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId',
}

enum ChannelsApiRouteParam {
  BLOGGER_ID = ':bloggerId',
  CHANNEL_ID = ':channelId',
}

enum ChannelsApiRouteQueryParam {
  BLOGGER_ID = 'bloggerId',
  REDIRECT_URI = 'redirectUri',
}

@Injectable()
export class YouTubeChannelsApiService extends RestService {
  constructor(
    @Inject(BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
    authService: InternalAuthService,
  ) {
    super(authService);
  }

  getAutheticationUri(bloggerId: string, redirectURI: string): string {
    const uriQueries = `?${
      ChannelsApiRouteQueryParam.BLOGGER_ID
    }=${bloggerId}&${
      ChannelsApiRouteQueryParam.REDIRECT_URI
    }=${encodeURIComponent(redirectURI)}`;

    return `${this.basePath}${ChannelsApiRoute.AUTH}${uriQueries}`;
  }

  getChannels(bloggerId: string): Observable<YouTubeChannel[]> {
    const route =
      this.basePath +
      ChannelsApiRoute.GET_CHANNELS.replace(
        ChannelsApiRouteParam.BLOGGER_ID,
        bloggerId,
      );

    return this.httpClient.get<any>(route, {
      headers: this.getHeaders(),
    });
  }

  removeChannel(bloggerId: string, channelId: string): Observable<any> {
    const route =
      this.basePath +
      ChannelsApiRoute.REMOVE_CHANNEL.replace(
        ChannelsApiRouteParam.BLOGGER_ID,
        bloggerId,
      ).replace(ChannelsApiRouteParam.CHANNEL_ID, channelId);

    return this.httpClient.delete<any>(route, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
