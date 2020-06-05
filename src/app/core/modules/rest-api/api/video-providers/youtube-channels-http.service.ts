import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../../injection-tokens';
import { YouTubeChannelDto } from '../../models/video-providers/youtube/youtube-channel.dto';
import { ContentType, HttpRestService } from '../../services/http-rest.service';

enum ApiRoute {
  AUTH = '/api/admin/blogger/:bloggerId/youtube/auth',
  GET_CHANNELS = '/api/admin/blogger/:bloggerId/youtube/channel',
  GET_CHANNEL = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId',
  REMOVE_CHANNEL = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId',
}

enum RouteParam {
  BLOGGER_ID = ':bloggerId',
  CHANNEL_ID = ':channelId',
}

enum RouteQueryParam {
  BLOGGER_ID = 'bloggerId',
  SUCCESSFUL_REDIRECT_URI = 'successfulRedirectUri',
  FAILURE_REDIRECT_URI = 'unsuccessfulRedirectUri',
}

@Injectable()
export class YouTubeChannelsHttpService extends HttpRestService {
  constructor(
    @Inject(BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
  ) {
    super();
  }

  getAutheticationUri(
    bloggerId: string,
    { successful, failure }: { successful: string; failure: string },
  ): string {
    const uriQueries =
      `?${RouteQueryParam.SUCCESSFUL_REDIRECT_URI}=${encodeURIComponent(
        successful,
      )}` +
      `&${RouteQueryParam.FAILURE_REDIRECT_URI}=${encodeURIComponent(failure)}`;

    const route = ApiRoute.AUTH.replace(RouteParam.BLOGGER_ID, bloggerId);

    return `${this.basePath}${route}${uriQueries}`;
  }

  getChannels(bloggerId: string): Observable<YouTubeChannelDto[]> {
    const route =
      this.basePath +
      ApiRoute.GET_CHANNELS.replace(RouteParam.BLOGGER_ID, bloggerId);

    return this.httpClient.get<any>(route, {
      headers: this.getHeaders(),
    });
  }

  getChannel(
    bloggerId: string,
    channelId: string,
  ): Observable<YouTubeChannelDto> {
    const route = ApiRoute.GET_CHANNEL.replace(
      RouteParam.BLOGGER_ID,
      bloggerId,
    ).replace(RouteParam.CHANNEL_ID, channelId);

    return this.httpClient.get<any>(`${this.basePath}${route}`, {
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
