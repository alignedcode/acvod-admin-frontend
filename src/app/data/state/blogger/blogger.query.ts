import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { BloggerState } from './blogger.state';
import { BloggerStore } from './blogger.store';

@Injectable()
export class BloggerQuery extends Query<BloggerState> {
  blogger$ = this.select('blogger');

  constructor(store: BloggerStore) {
    super(store);
  }
}
