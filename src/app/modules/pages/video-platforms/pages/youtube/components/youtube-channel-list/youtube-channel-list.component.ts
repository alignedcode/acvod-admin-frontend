import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';

@Component({
  selector: 'youtube-channel-list',
  templateUrl: './youtube-channel-list.component.html',
  styleUrls: ['./youtube-channel-list.component.scss'],
})
export class YouTubeChannelListComponent {
  readonly channels: Observable<YouTubeChannel[]>;

  constructor(private readonly query: YouTubeQuery) {
    this.channels = query.channels$;
  }
}
