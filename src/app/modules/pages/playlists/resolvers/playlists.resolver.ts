import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { Playlist } from '@data/models/playlist.entity';
import { PlaylistsService } from '@data/services/playlists.service';
import { PlaylistsQuery } from '@data/state/playlists/playlists.query';
import { PlaylistsNotificationService } from '../services/playlists-notifiaction.service';

@Injectable()
export class ResolvablePlaylists
  implements Resolve<ResolvableData<Observable<Playlist[]>, string>> {
  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly query: PlaylistsQuery,
    private readonly notificationService: PlaylistsNotificationService,
  ) {}

  resolve(): Observable<ResolvableData<Observable<Playlist[]>, string>> {
    return this.playlistsService.loadPlaylists().pipe(
      map(() => ({ data: this.query.playlists$ })),
      catchError(() => {
        this.notificationService.onFailedLoadedPlaylists();

        // TODO: use a business error
        return of({ error: `Can't load playlists` });
      }),
    );
  }
}
