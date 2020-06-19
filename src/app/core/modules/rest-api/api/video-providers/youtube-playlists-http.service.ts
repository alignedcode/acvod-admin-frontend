import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BACKEND_BASE_PATH } from '../../backend-base-path.provider';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { YouTubePlaylistDto } from '../../models/video-providers/youtube/youtube-playlist.dto';
import { YouTubeVideoDto } from '../../models/video-providers/youtube/youtube-video.dto';
import { ContentType, HttpRestService } from '../../services/http-rest.service';

enum ApiRoute {
  GET_PLAYLISTS = '/api/admin/youtube/channel/:channelId/playlist',
  GET_PLAYLIST = '/api/admin/youtube/channel/:channelId/playlist/:playlistId',
  SELECT_PLAYLIST = '/api/admin/youtube/channel/:channelId/playlist/:playlistId',
  DESELECT_PLAYLIST = '/api/admin/youtube/channel/:channelId/playlist/:playlistId',
  GET_PLAYLIST_VIDEOS = '/api/admin/youtube/channel/:channelId/playlist/:playlistId/video',
}

enum RouteParam {
  BLOGGER_ID = ':bloggerId',
  CHANNEL_ID = ':channelId',
  PLAYLIST_ID = ':playlistId',
}

enum RouteQueryParam {
  SELECTION_TYPE = 'selectionType',
  MAX_PAGE_SIZE = 'maxPageSize',
  PAGE_TOKEN = 'pageToken',
}

enum PlaylistsSelectionType {
  CHOSEN = 'chosen',
  ALL = 'all',
}

// TODO: find a more simpler solution to manage routes (p.s.: builders)
@Injectable()
export class YouTubePlaylistsHttpService extends HttpRestService {
  constructor(
    @Inject(BACKEND_BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
  ) {
    super();
  }

  getAllPlaylists(
    bloggerId: string,
    channelId: string,
    pageToken: string = '',
  ): Observable<PaginatedResponse<YouTubePlaylistDto>> {
    const route = ApiRoute.GET_PLAYLISTS.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    );

    return this.httpClient.get<PaginatedResponse<YouTubePlaylistDto>>(
      `${this.basePath}${route}`,
      {
        headers: this.getHeaders(),
        params: {
          [RouteQueryParam.SELECTION_TYPE]: PlaylistsSelectionType.ALL,
          [RouteQueryParam.PAGE_TOKEN]: pageToken,
        },
      },
    );
  }

  getPlaylist(bloggerId: string, channelId: string, playlistId: string) {
    const route = ApiRoute.GET_PLAYLIST.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    ).replace(RouteParam.PLAYLIST_ID, playlistId);

    return this.httpClient.get<YouTubePlaylistDto>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  getSelectedPlaylists(
    bloggerId: string,
    channelId: string,
    pageToken: string = '',
  ): Observable<YouTubePlaylistDto[]> {
    const route = ApiRoute.GET_PLAYLISTS.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    );

    return this.httpClient.get<YouTubePlaylistDto[]>(
      `${this.basePath}${route}`,
      {
        headers: this.getHeaders(),
        params: {
          [RouteQueryParam.SELECTION_TYPE]: PlaylistsSelectionType.CHOSEN,
          [RouteQueryParam.PAGE_TOKEN]: pageToken,
        },
      },
    );
  }

  selectPlaylist(
    bloggerId: string,
    channelId: string,
    playlistId: string,
  ): Observable<any> {
    const route = ApiRoute.SELECT_PLAYLIST.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    ).replace(RouteParam.PLAYLIST_ID, playlistId);

    return this.httpClient.post<any>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  deselectPlaylist(
    bloggerId: string,
    channelId: string,
    playlistId: string,
  ): Observable<any> {
    const route = ApiRoute.DESELECT_PLAYLIST.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    ).replace(RouteParam.PLAYLIST_ID, playlistId);

    return this.httpClient.delete<any>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  getPlaylistVideos(
    bloggerId: string,
    channelId: string,
    playlistId: string,
    pageToken: string = '',
    maxPageSize: number = 50,
  ): Observable<PaginatedResponse<YouTubeVideoDto>> {
    const route = ApiRoute.GET_PLAYLIST_VIDEOS.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    ).replace(RouteParam.PLAYLIST_ID, playlistId);

    return this.httpClient.get<PaginatedResponse<YouTubeVideoDto>>(
      `${this.basePath}${route}`,
      {
        headers: this.getHeaders(),
        params: {
          [RouteQueryParam.PAGE_TOKEN]: pageToken,
          [RouteQueryParam.MAX_PAGE_SIZE]: maxPageSize.toString(),
        },
      },
    );
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
