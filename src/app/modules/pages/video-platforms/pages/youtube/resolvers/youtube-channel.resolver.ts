import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { YouTubeNotificationService } from '../services/youtube-notification.service';
import { YouTubeRoutingService } from '../services/youtube-routing.service';

@Injectable()
export class ResolvableYouTubeChannel
  implements Resolve<ResolvableData<Observable<YouTubeChannel>, string>> {
  constructor(
    private readonly channelsService: YouTubeChannelsService,
    private readonly routingService: YouTubeRoutingService,
    private readonly notificationService: YouTubeNotificationService,
    private readonly query: YouTubeQuery,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<ResolvableData<Observable<YouTubeChannel>, string>> {
    const channelId = this.getChannel(route);
    const foundPlaylist = this.query.getChannelValue(channelId);

    if (!foundPlaylist) {
      return this.channelsService.loadChannel(channelId).pipe(
        map(() => ({ data: this.query.getChannel(channelId) })),
        catchError(() => {
          this.routingService
            .navigateToChannelsPage()
            .then(() => this.notificationService.onChannelNotFound(channelId));

          // TODO: use a business error
          return of({ error: `Can't find a channel` });
        }),
      );
    }

    return of({ data: this.query.getChannel(channelId) });
  }

  private getChannel({ paramMap: params }: ActivatedRouteSnapshot): string {
    // TODO: use key from the route param enum
    return params.get('channelId');
  }
}
