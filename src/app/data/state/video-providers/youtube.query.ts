import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { YouTubeState } from './youtube.state';
import { YouTubeStore } from './youtube.store';

@Injectable()
export class YouTubeQuery extends Query<YouTubeState> {
  channels$ = this.select('channels');

  constructor(store: YouTubeStore) {
    super(store);
  }
}
