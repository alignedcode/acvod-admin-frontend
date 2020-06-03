import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { StoreToken } from '../store-token.enum';
import { BloggerState, createInitialState } from './blogger.state';

@Injectable()
@StoreConfig({ name: StoreToken.BLOGGER })
export class BloggerStore extends Store<BloggerState> {
  constructor() {
    super(createInitialState());
  }
}
