import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { VideosState } from './videos.state';
import { VideosStore } from './videos.store';

@Injectable()
export class VideosQuery extends Query<VideosState> {
  videos$ = this.select('videos');

  constructor(store: VideosStore) {
    super(store);
  }
}
