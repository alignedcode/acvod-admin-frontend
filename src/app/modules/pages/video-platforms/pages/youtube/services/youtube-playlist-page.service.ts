import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Page } from '@data/models/page';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';

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
    private readonly playlistsService: YouTubePlaylistsService,
  ) {}

  // TODO: move the pagination logic into a pagination service
  loadVideoPage(route: ActivatedRoute, loadPageNumber: number = 0) {
    const { size, pageNumber } = this.videoPage.value;
    const { channelId, playlistId } = this.getPlaylistAndChannel(route);
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

  private getPlaylistAndChannel({
    snapshot: { paramMap: params },
  }: ActivatedRoute): {
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
