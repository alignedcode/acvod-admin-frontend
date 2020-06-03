import { Blogger } from '@data/models/blogger.entity';

export interface BloggerState {
  blogger?: Blogger;
}

export function createInitialState(): BloggerState {
  return {};
}
