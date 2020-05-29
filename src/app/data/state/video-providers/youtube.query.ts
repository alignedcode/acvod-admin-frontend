import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeState } from './youtube.state';
import { YouTubeStore } from './youtube.store';

@Injectable()
export class YouTubeQuery extends Query<YouTubeState> {
  channels$ = this.select('channels');

  constructor(store: YouTubeStore) {
    super(store);
  }

  getChannelValue(channelId: string): YouTubeChannel {
    return this.getValue().channels.find(({ id }) => id === channelId);
  }

  getChannel(channelId: string): Observable<YouTubeChannel> {
    return this.channels$.pipe(
      map((channels) => channels.find(({ id }) => channelId === id)),
    );
  }

  getUnselectedPlaylistsInChannel(channelId: string) {
    return this.channels$.pipe(
      map((channels) => {
        const { allPlaylists, selectedPlaylists } = channels.find(
          ({ id }) => id === channelId,
        );

        return allPlaylists.filter(
          ({ id }) =>
            !selectedPlaylists.some(({ id: selectedId }) => id === selectedId),
        );
      }),
    );
  }
}
