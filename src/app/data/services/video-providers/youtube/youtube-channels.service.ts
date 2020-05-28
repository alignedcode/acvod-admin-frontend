import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { OAuthService } from '@core/modules/auth/services/oauth.service';
import { YouTubeChannelsApiService } from '@core/modules/rest-api/api/video-providers/youtube-channels-api.service';
import { YouTubeChannel } from '@core/modules/rest-api/models/video-providers/youtube/youtube-channel.model';
import { BloggersService } from '@data/services/bloggers.service';

@Injectable()
export class YouTubeChannelsService {
  onChannelsChange: BehaviorSubject<YouTubeChannel[]> = new BehaviorSubject([]);

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

  removeChannel(channelId: string): Observable<any> {
    return this.bloggerService.getBlogger().pipe(
      mergeMap(({ id: bloggerId }) =>
        this.channelsApiService.removeChannel(bloggerId, channelId),
      ),
      tap(() => {
        this.onChannelsChange.next(
          this.onChannelsChange
            .getValue()
            .filter((channel) => channel.id !== channelId),
        );
      }),
    );
  }

  getChannels(): Observable<YouTubeChannel[]> {
    return this.bloggerService.getBlogger().pipe(
      mergeMap(({ id }) => this.channelsApiService.getChannels(id)),
      tap((channels) => {
        this.onChannelsChange.next(channels);
      }),
    );
  }
}
