import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PlaylistsHttpService } from '@core/modules/rest-api/api/playlists-http.service';
import { AddPlaylistDto } from '@core/modules/rest-api/models/playlist/add-playlist.dto';
import { Playlist } from '@data/models/playlist.entity';
import { PlaylistsStore } from '@data/state/playlists/playlists.store';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playlistsApiService: PlaylistsHttpService,
    private readonly playlistsStore: PlaylistsStore,
  ) {}

  loadPlaylists(): Observable<Playlist[]> {
    return this.playlistsApiService.getPlaylists().pipe(
      tap((playlists) => {
        this.playlistsStore.update({
          playlists,
        });
      }),
    );
  }

  addPlaylist(playlist: AddPlaylistDto): Observable<Playlist> {
    return this.playlistsApiService.addPlaylist(playlist).pipe(
      tap((createdPlaylist) => {
        this.playlistsStore.update(({ playlists }) => ({
          playlists: playlists.concat(createdPlaylist),
        }));
      }),
    );
  }

  removePlaylist(playlistId: string): Observable<Playlist> {
    return this.playlistsApiService.removePlaylist(playlistId).pipe(
      tap(() => ({
        playlists: this.playlistsStore.update(({ playlists }) => ({
          playlists: playlists.filter(({ id }) => id !== playlistId),
        })),
      })),
    );
  }
}
