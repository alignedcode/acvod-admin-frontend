import { Component, Input } from '@angular/core';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-channel-card',
  templateUrl: './youtube-channel-card.component.html',
  styleUrls: ['./youtube-channel-card.component.scss'],
})
export class YouTubeChannelCardComponent {
  @Input() channel: YouTubeChannel;

  constructor(
    private readonly channelsService: YouTubeChannelsService,
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly routingService: YouTubeRoutingService,
  ) {}

  onRemoveChannel() {
    this.channelsService
      .removeChannel(this.channel.id)
      .subscribe(() => this.routingService.navigateToChannelsPage());
  }

  onSelectPlaylist(playlistId: string) {
    this.playlistsService
      .selectPlaylist(this.channel.id, playlistId)
      .subscribe();
  }

  onDeselectPlaylist(playlistId: string) {
    this.playlistsService
      .deselectPlaylist(this.channel.id, playlistId)
      .subscribe();
  }
}
