import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { YouTubePlaylistsHttpService } from '@core/modules/rest-api/api/video-providers/youtube-playlists-http.service';
import { PaginatedResponse } from '@core/modules/rest-api/models/paginated-response.model';
import { YouTubePlaylist } from '@core/modules/rest-api/models/video-providers/youtube/youtube-playlist.model';
import { BloggersService } from '@data/services/bloggers.service';

@Injectable()
export class YouTubePlaylistsService {
  constructor(
    private readonly bloggerService: BloggersService,
    private readonly playlistsService: YouTubePlaylistsHttpService,
  ) {}

  getAllPlaylists(
    channelId: string,
    pageToken?: string,
  ): Observable<PaginatedResponse<YouTubePlaylist>> {
    return this.bloggerService
      .getBlogger()
      .pipe(
        mergeMap(({ id: bloggerId }) =>
          this.playlistsService.getAllPlaylists(
            bloggerId,
            channelId,
            pageToken,
          ),
        ),
      );
  }

  getSelectedPlaylists(
    channelId: string,
    pageToken?: string,
  ): Observable<PaginatedResponse<YouTubePlaylist>> {
    return this.bloggerService
      .getBlogger()
      .pipe(
        mergeMap(({ id: bloggerId }) =>
          this.playlistsService.getSelectedPlaylists(
            bloggerId,
            channelId,
            pageToken,
          ),
        ),
      );
  }

  selectPlaylist(channelId: string, playlistId: string): Observable<any> {
    return this.bloggerService
      .getBlogger()
      .pipe(
        mergeMap(({ id: bloggerId }) =>
          this.playlistsService.selectPlaylist(
            bloggerId,
            channelId,
            playlistId,
          ),
        ),
      );
  }

  deselectPlaylist(channelId: string, playlistId: string): Observable<any> {
    return this.bloggerService
      .getBlogger()
      .pipe(
        mergeMap(({ id: bloggerId }) =>
          this.playlistsService.deselectPlaylist(
            bloggerId,
            channelId,
            playlistId,
          ),
        ),
      );
  }
}
