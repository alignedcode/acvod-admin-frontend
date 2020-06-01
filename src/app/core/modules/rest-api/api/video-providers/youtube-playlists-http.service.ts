import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../../injection-tokens';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { YouTubePlaylistDto } from '../../models/video-providers/youtube/youtube-playlist.dto';
import { ContentType, HttpRestService } from '../../services/http-rest.service';

enum ApiRoute {
  GET_PLAYLISTS = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId/playlist',
  SELECT_PLAYLIST = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId/playlist/:playlistId',
  DESELECT_PLAYLIST = '/api/admin/blogger/:bloggerId/youtube/channel/:channelId/playlist/:playlistId',
}

enum RouteParam {
  BLOGGER_ID = ':bloggerId',
  CHANNEL_ID = ':channelId',
  PLAYLIST_ID = ':playlistId',
}

enum RouteQueryParam {
  SELECTION_TYPE = 'selectionType',
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
    @Inject(BASE_PATH) protected basePath: string,
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
      RouteParam.BLOGGER_ID,
      bloggerId,
    ).replace(RouteParam.CHANNEL_ID, channelId);

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

  getSelectedPlaylists(
    bloggerId: string,
    channelId: string,
    pageToken: string = '',
  ): Observable<YouTubePlaylistDto[]> {
    const route = ApiRoute.GET_PLAYLISTS.replace(
      RouteParam.BLOGGER_ID,
      bloggerId,
    ).replace(RouteParam.CHANNEL_ID, channelId);

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
      RouteParam.BLOGGER_ID,
      bloggerId,
    )
      .replace(RouteParam.CHANNEL_ID, channelId)
      .replace(RouteParam.PLAYLIST_ID, playlistId);

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
      RouteParam.BLOGGER_ID,
      bloggerId,
    )
      .replace(RouteParam.CHANNEL_ID, channelId)
      .replace(RouteParam.PLAYLIST_ID, playlistId);

    return this.httpClient.delete<any>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
