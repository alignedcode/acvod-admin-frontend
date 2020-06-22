import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { StoreToken } from '../store-token.enum';
import { createInitialState, PlaylistsState } from './playlists.state';

@Injectable()
@StoreConfig({ name: StoreToken.PLAYLISTS })
export class PlaylistsStore extends Store<PlaylistsState> {
  constructor() {
    super(createInitialState());
  }
}
