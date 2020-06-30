import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OAuthService } from '@core/modules/auth/services/oauth.service';
import { YouTubeChannelsHttpService } from '@core/modules/rest-api/api/video-providers/youtube-channels-http.service';
import { YouTubeChannelDto } from '@core/modules/rest-api/models/video-providers/youtube/youtube-channel.dto';
import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { BloggersService } from '@data/services/bloggers.service';
import { YouTubeStore } from '@data/state/video-providers/youtube.store';

@Injectable()
export class YouTubeChannelsService {
  constructor(
    private readonly bloggerService: BloggersService,
    private readonly oAuthService: OAuthService,
    private readonly channelsApiService: YouTubeChannelsHttpService,
    private readonly youtubeStore: YouTubeStore,
  ) {}

  addChannel(redirectUri: { successful: string; failure: string }) {
    this.bloggerService.getBloggerId().subscribe((id) => {
      const authenticationUri = this.channelsApiService.getAutheticationUri(
        id,
        redirectUri,
      );

      this.oAuthService.startAuthenticationFlow(authenticationUri);
    });
  }

  removeChannel(channelId: string): Observable<any> {
    return this.channelsApiService.removeChannel(channelId).pipe(
      tap(() => {
        this.youtubeStore.update(({ channels }) => ({
          channels: channels.filter(({ id }) => id !== channelId),
        }));
      }),
    );
  }

  loadChannels(): Observable<YouTubeChannelDto[]> {
    return this.channelsApiService.getChannels().pipe(
      tap((channels) => {
        this.youtubeStore.update({
          channels: channels.map((channel) =>
            this.mapChannelDtoToEntity(channel),
          ),
        });
      }),
    );
  }

  loadChannel(channelId: string): Observable<YouTubeChannelDto> {
    return this.channelsApiService.getChannel(channelId).pipe(
      tap((channel) => {
        this.youtubeStore.update(({ channels }) => ({
          channels: channels
            .filter(({ id }) => id !== channelId)
            .concat(this.mapChannelDtoToEntity(channel)),
        }));
      }),
    );
  }

  private mapChannelDtoToEntity({
    id,
    snippet: { title, description, publishedAt },
    statistics,
  }: YouTubeChannelDto): YouTubeChannel {
    return {
      id,
      title,
      description,
      publishedAt,
      allPlaylists: [],
      selectedPlaylists: [],
      statistics,
    };
  }
}
