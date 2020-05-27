import { Inject, Injectable } from '@angular/core';

import { BASE_PATH } from '../../injection-tokens';

enum ChannelsApiRoute {
  AUTH = '/api/admin/youtube/auth',
}

enum ChannelsApiRouteQueryParam {
  BLOGGER_ID = 'bloggerId',
  REDIRECT_URI = 'redirectUri',
}

@Injectable()
export class YouTubeChannelsApiService {
  constructor(@Inject(BASE_PATH) protected basePath: string) {}

  getAutheticationUri(bloggerId: string, redirectURI: string): string {
    const uriQueries = `?${
      ChannelsApiRouteQueryParam.BLOGGER_ID
    }=${bloggerId}&${
      ChannelsApiRouteQueryParam.REDIRECT_URI
    }=${encodeURIComponent(redirectURI)}`;

    return `${this.basePath}${ChannelsApiRoute.AUTH}${uriQueries}`;
  }
}
