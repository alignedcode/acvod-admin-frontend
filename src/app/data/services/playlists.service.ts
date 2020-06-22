import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { PlaylistsHttpService } from '@core/modules/rest-api/api/playlists-http.service';
import { Playlist } from '@data/models/playlist.entity';
import { PlaylistsStore } from '@data/state/playlists/playlists.store';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playlistsApiService: PlaylistsHttpService,
    private readonly authService: InternalAuthService,
    private readonly playlistsStore: PlaylistsStore,
  ) {}

  getBloggerId(): Observable<string> {
    return this.authService
      .getToken()
      .pipe(map((token) => token.getPayload().bloggerId));
  }

  loadPlaylists(): Observable<Playlist[]> {
    return this.playlistsApiService.getPlaylists().pipe(
      tap((playlists) => {
        this.playlistsStore.update({
          playlists,
        });
      }),
    );
  }

  // TODO: use a different model for creation
  addPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.playlistsApiService.addPlaylist(playlist).pipe(
      tap((createdPlaylist) => {
        this.playlistsStore.update(({ playlists }) => {
          playlists.concat(createdPlaylist);
        });
      }),
    );
  }

  removePlaylist(playlistId: string): Observable<Playlist> {
    return this.playlistsApiService.removePlaylist(playlistId).pipe(
      tap(() => {
        this.playlistsStore.update(({ playlists }) => ({
          playlists: playlists.filter(({ id }) => id !== playlistId),
        }));
      }),
    );
  }
}
