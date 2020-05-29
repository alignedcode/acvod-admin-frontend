import { Component, Input } from '@angular/core';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';

@Component({
  selector: 'youtube-channel-card',
  templateUrl: './youtube-channel-card.component.html',
  styleUrls: ['./youtube-channel-card.component.scss'],
})
export class YouTubeChannelCardComponent {
  @Input() channel: YouTubeChannel;

  constructor(private readonly channelsService: YouTubeChannelsService) {}

  onRemoveChannel() {
    this.channelsService.removeChannel(this.channel.id).subscribe();
  }

  addPlaylist() {
    throw new Error('Feature is not implemented');
  }
}
