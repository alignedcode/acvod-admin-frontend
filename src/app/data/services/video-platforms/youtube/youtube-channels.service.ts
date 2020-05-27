import { Injectable } from '@angular/core';

import { OAuthService } from '@core/modules/auth/services/oauth.service';
import { YouTubeChannelsApiService } from '@core/modules/rest-api/api/video-providers/youtube-channels-api.service';
import { BloggersService } from '@data/services/bloggers.service';

@Injectable()
export class YouTubeChannelsService {
  constructor(
    private readonly bloggerService: BloggersService,
    private readonly oAuthService: OAuthService,
    private readonly channelsApiService: YouTubeChannelsApiService,
  ) {}

  addChannel(redirectUri: string) {
    this.bloggerService.getBlogger().subscribe(({ id }) => {
      const authenticationUri = this.channelsApiService.getAutheticationUri(
        id,
        redirectUri,
      );

      this.oAuthService.startAuthenticationFlow(authenticationUri);
    });
  }
}
