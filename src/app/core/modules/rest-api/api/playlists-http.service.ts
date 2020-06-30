import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BACKEND_BASE_PATH } from '../backend-base-path.provider';
import { AddPlaylistDto } from '../models/playlist/add-playlist.dto';
import { PlaylistDto } from '../models/playlist/playlist.dto';
import { ContentType, HttpRestService } from '../services/http-rest.service';

enum ApiRoute {
  GET_PLAYLISTS = '/api/admin/content/playlist',
  ADD_PLAYLIST = '/api/admin/content/playlist',
  REMOVE_PLAYLIST = '/api/admin/content/playlist/:playlistId',
}

enum RouteParam {
  PLAYLIST_ID = ':playlistId',
}

@Injectable()
export class PlaylistsHttpService extends HttpRestService {
  constructor(
    @Inject(BACKEND_BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
  ) {
    super();
  }

  getPlaylists(): Observable<PlaylistDto[]> {
    return this.httpClient.get<PlaylistDto[]>(
      `${this.basePath}${ApiRoute.GET_PLAYLISTS}`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  addPlaylist(playlist: AddPlaylistDto): Observable<PlaylistDto> {
    return this.httpClient.post<PlaylistDto>(
      `${this.basePath}${ApiRoute.GET_PLAYLISTS}`,
      playlist,
      {
        headers: this.getHeaders(),
      },
    );
  }

  removePlaylist(playlistId: string): Observable<any> {
    const route = ApiRoute.REMOVE_PLAYLIST.replace(
      RouteParam.PLAYLIST_ID,
      playlistId,
    );

    return this.httpClient.delete<any>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
