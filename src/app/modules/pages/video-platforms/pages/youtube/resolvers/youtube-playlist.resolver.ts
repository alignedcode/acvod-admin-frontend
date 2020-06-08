import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { YouTubeNotificationService } from '../services/youtube-notification.service';
import { YouTubeRoutingService } from '../services/youtube-routing.service';

@Injectable()
export class ResolvableYouTubePlaylist
  implements Resolve<ResolvableData<Observable<YouTubePlaylist>, string>> {
  constructor(
    private readonly query: YouTubeQuery,
    private readonly channelsService: YouTubeChannelsService,
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly routingService: YouTubeRoutingService,
    private readonly notificationService: YouTubeNotificationService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<ResolvableData<Observable<YouTubePlaylist>, string>> {
    const { channelId, playlistId } = this.getPlaylistAndChannel(route);
    const foundPlaylist = this.query.getPlaylistValue(channelId, playlistId);

    if (!foundPlaylist) {
      return this.channelsService.loadChannel(channelId).pipe(
        catchError(() => {
          this.routingService
            .navigateToChannelsPage()
            .then(() => this.notificationService.onChannelNotFound(channelId));

          // TODO: use a business error
          return throwError(`Can't find a channel`);
        }),
        flatMap(() =>
          this.playlistsService.loadPlaylist(channelId, playlistId),
        ),
        catchError(() => {
          this.routingService
            .navigateToChannelPage(channelId)
            .then(() =>
              this.notificationService.onPlaylistNotFound(
                channelId,
                playlistId,
              ),
            );

          // TODO: use a business error
          return throwError(`Can't find a playlist in a channel`);
        }),
        map(() => ({ data: this.query.getPlaylist(channelId, playlistId) })),
        catchError((error) => of({ error })),
      );
    }

    return of({ data: this.query.getPlaylist(channelId, playlistId) });
  }

  private getPlaylistAndChannel({
    paramMap: params,
  }: ActivatedRouteSnapshot): {
    channelId: string;
    playlistId: string;
  } {
    // TODO: use keys from the route param enum
    return {
      channelId: params.get('channelId'),
      playlistId: params.get('playlistId'),
    };
  }
}
