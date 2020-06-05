import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';

import { Page } from '@data/models/page';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { YouTubeNotificationService } from './youtube-notification.service';
import { YouTubeRoutingService } from './youtube-routing.service';

@Injectable()
export class YouTubePlaylistPageService {
  // TODO: move to a default entity page
  private readonly videoPage = new BehaviorSubject<Page>({
    size: 10,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
  });

  get videoPage$(): Observable<Page> {
    return this.videoPage.asObservable();
  }

  constructor(
    private readonly query: YouTubeQuery,
    private readonly channelsService: YouTubeChannelsService,
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly routingService: YouTubeRoutingService,
    private readonly notificationService: YouTubeNotificationService,
  ) {}

  tryToGetPlaylist(
    route: ActivatedRoute,
  ): Observable<Observable<YouTubePlaylist>> {
    const { channelId, playlistId } = this.getPlaylistAndChannelFromRoute(
      route,
    );
    const foundPlaylist = this.query.getPlaylistValue(channelId, playlistId);

    if (!foundPlaylist) {
      return this.channelsService.loadChannel(channelId).pipe(
        catchError(() => {
          this.notificationService.onChannelNotFound(channelId);
          this.routingService.navigateToChannelsPage();

          // TODO: use a business error
          return throwError(`Can't find a channel`);
        }),
        flatMap(() =>
          this.playlistsService.loadPlaylist(channelId, playlistId),
        ),
        catchError(() => {
          this.notificationService.onPlaylistNotFound(channelId, playlistId);
          this.routingService.navigateToChannelPage(channelId);

          // TODO: use a business error
          return throwError(`Can't find a playlist in a channel`);
        }),
        map(() => this.query.getPlaylist(channelId, playlistId)),
      );
    }

    return of(this.query.getPlaylist(channelId, playlistId));
  }

  // TODO: move the pagination logic into a pagination service
  loadVideoPage(route: ActivatedRoute, loadPageNumber: number = 0) {
    const { size, pageNumber } = this.videoPage.value;
    const { channelId, playlistId } = this.getPlaylistAndChannelFromRoute(
      route,
    );
    const {
      videos: { nextPageToken, prevPageToken },
    } = this.query.getPlaylistValue(channelId, playlistId);

    return this.playlistsService
      .loadPlaylistVideos(
        channelId,
        playlistId,
        this.getNextPageToken(loadPageNumber, pageNumber, {
          nextPage: nextPageToken,
          previousPage: prevPageToken,
        }),
        size,
      )
      .pipe(
        tap(({ pageInfo: { totalResults } }) => {
          this.videoPage.next({
            size,
            pageNumber: loadPageNumber,
            totalElements: totalResults,
            totalPages: Math.ceil(totalResults / size),
          });
        }),
      );
  }

  private getNextPageToken(
    loadPageNumber: number,
    currentPageNumber,
    { nextPage, previousPage }: { nextPage: string; previousPage: string },
  ): string {
    const pageDistance = loadPageNumber - currentPageNumber;

    if (pageDistance < 0) {
      return previousPage;
    }

    if (pageDistance > 0) {
      return nextPage;
    }

    return '';
  }

  private getPlaylistAndChannelFromRoute({
    snapshot: { paramMap: params },
  }: ActivatedRoute): {
    channelId: string;
    playlistId: string;
  } {
    // TODO: use values from the route param enum
    return {
      channelId: params.get('channelId'),
      playlistId: params.get('playlistId'),
    };
  }
}
