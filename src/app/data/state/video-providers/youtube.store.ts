import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { StoreToken } from '../store-token.enum';
import { createInitialState, YouTubeState } from './youtube.state';

@Injectable()
@StoreConfig({ name: StoreToken.YOUTUBE })
export class YouTubeStore extends Store<YouTubeState> {
  constructor() {
    super(createInitialState());
  }
}
