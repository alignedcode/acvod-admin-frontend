import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { PlaylistsState } from './playlists.state';
import { PlaylistsStore } from './playlists.store';

@Injectable()
export class PlaylistsQuery extends Query<PlaylistsState> {
  playlists$ = this.select('playlists');

  constructor(store: PlaylistsStore) {
    super(store);
  }
}
