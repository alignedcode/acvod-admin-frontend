import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

import { YouTubePlaylistsHttpService } from '@core/modules/rest-api/api/video-providers/youtube-playlists-http.service';
import { PaginatedResponse } from '@core/modules/rest-api/models/paginated-response.model';
import { YouTubePlaylistDto } from '@core/modules/rest-api/models/video-providers/youtube/youtube-playlist.dto';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubeVideo } from '@data/models/video-providers/youtube/youtube-video.entity';
import { BloggersService } from '@data/services/bloggers.service';
import { YouTubeStore } from '@data/state/video-providers/youtube.store';

@Injectable()
export class YouTubePlaylistsService {
  constructor(
    private readonly bloggerService: BloggersService,
    private readonly playlistsService: YouTubePlaylistsHttpService,
    private readonly store: YouTubeStore,
  ) {}

  // TODO: use a pagination feature
  loadAllPlaylists(
    channelId: string,
    pageToken?: string,
  ): Observable<YouTubePlaylist[]> {
    return this.bloggerService.getBloggerId().pipe(
      flatMap((bloggerId) =>
        this.playlistsService.getAllPlaylists(bloggerId, channelId, pageToken),
      ),
      map(({ items }) =>
        items.map((playlist) => this.mapPalylistDtoToEntity(playlist)),
      ),
      tap((allPlaylists) => {
        this.store.update(({ channels }) => {
          const channelToUpdate = channels.find(({ id }) => id === channelId);

          return {
            channels: [
              ...channels.filter(({ id }) => id !== channelId),
              { ...channelToUpdate, allPlaylists },
            ],
          };
        });
      }),
    );
  }

  loadPlaylist(
    channelId: string,
    playlistId: string,
  ): Observable<YouTubePlaylist> {
    return this.bloggerService.getBloggerId().pipe(
      flatMap((bloggerId) =>
        this.playlistsService.getPlaylist(bloggerId, channelId, playlistId),
      ),
      map((playlist) => this.mapPalylistDtoToEntity(playlist)),
      tap((playlist) => {
        this.store.update(({ channels }) => {
          const channelToUpdate = channels.find(({ id }) => id === channelId);

          return {
            channels: [
              ...channels.filter(({ id }) => id !== channelId),
              {
                ...channelToUpdate,
                allPlaylists: channelToUpdate.allPlaylists
                  .filter(({ id }) => id !== playlistId)
                  .concat(playlist),
                selectedPlaylists: channelToUpdate.selectedPlaylists
                  .filter(({ id }) => id !== playlistId)
                  .concat(playlist),
              },
            ],
          };
        });
      }),
    );
  }

  // TODO: use a pagination feature
  loadSelectedPlaylists(
    channelId: string,
    pageToken?: string,
  ): Observable<YouTubePlaylist[]> {
    return this.bloggerService.getBloggerId().pipe(
      flatMap((bloggerId) =>
        this.playlistsService.getSelectedPlaylists(
          bloggerId,
          channelId,
          pageToken,
        ),
      ),
      map((playlists) =>
        playlists.map((playlist) => this.mapPalylistDtoToEntity(playlist)),
      ),
      tap((selectedPlaylists) => {
        this.store.update(({ channels }) => {
          const channelToUpdate = channels.find(({ id }) => id === channelId);

          return {
            channels: [
              ...channels.filter(({ id }) => id !== channelId),
              { ...channelToUpdate, selectedPlaylists },
            ],
          };
        });
      }),
    );
  }

  selectPlaylist(channelId: string, playlistId: string): Observable<any> {
    return this.bloggerService.getBloggerId().pipe(
      flatMap((bloggerId) =>
        this.playlistsService.selectPlaylist(bloggerId, channelId, playlistId),
      ),
      tap(() => {
        this.store.update(({ channels }) => {
          const foundChannel = channels.find(({ id }) => id === channelId);

          const selectedPlaylist = foundChannel.allPlaylists.find(
            ({ id }) => id === playlistId,
          );

          return {
            channels: [
              ...channels.filter(({ id }) => id !== channelId),
              {
                ...foundChannel,
                selectedPlaylists: foundChannel.selectedPlaylists.concat(
                  selectedPlaylist,
                ),
              },
            ],
          };
        });
      }),
    );
  }

  deselectPlaylist(channelId: string, playlistId: string): Observable<any> {
    return this.bloggerService.getBloggerId().pipe(
      flatMap((bloggerId) =>
        this.playlistsService.deselectPlaylist(
          bloggerId,
          channelId,
          playlistId,
        ),
      ),
      tap(() => {
        this.store.update(({ channels }) => {
          const foundChannel = channels.find(({ id }) => id === channelId);

          return {
            channels: [
              ...channels.filter(({ id }) => id !== channelId),
              {
                ...foundChannel,
                selectedPlaylists: foundChannel.selectedPlaylists.filter(
                  ({ id }) => id !== playlistId,
                ),
              },
            ],
          };
        });
      }),
    );
  }

  loadPlaylistVideos(
    channelId: string,
    playlistId: string,
    pageToken?: string,
    maxPageSize?: number,
  ): Observable<PaginatedResponse<YouTubeVideo>> {
    return this.bloggerService.getBloggerId().pipe(
      flatMap((bloggerId) =>
        this.playlistsService.getPlaylistVideos(
          bloggerId,
          channelId,
          playlistId,
          pageToken,
          maxPageSize,
        ),
      ),
      tap((videos) => {
        this.store.update(({ channels }) => {
          const foundChannel = channels.find(({ id }) => id === channelId);

          const foundPlaylist = foundChannel.allPlaylists.find(
            ({ id }) => id === playlistId,
          );

          return {
            channels: [
              ...channels.filter(({ id }) => id !== channelId),
              {
                ...foundChannel,
                allPlaylists: [
                  ...foundChannel.allPlaylists.filter(
                    ({ id }) => id !== playlistId,
                  ),
                  { ...foundPlaylist, videos },
                ],
              },
            ],
          };
        });
      }),
    );
  }

  private mapPalylistDtoToEntity({
    id,
    snippet: { title, description, publishedAt, thumbnails },
    contentDetails: { itemCount: videoCount },
  }: YouTubePlaylistDto): YouTubePlaylist {
    return {
      id,
      title,
      description,
      publishedAt,
      videoCount,
      videos: { items: [], pageInfo: { resultsPerPage: 0, totalResults: 0 } },
      thumbnails,
    };
  }
}
