import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { StoreToken } from '../store-token.enum';
import { createInitialState, VideosState } from './videos.state';

@Injectable()
@StoreConfig({ name: StoreToken.VIDEOS })
export class VideosStore extends Store<VideosState> {
  constructor() {
    super(createInitialState());
  }
}
