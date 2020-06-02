import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { YouTubeNotificationService } from '../../services/youtube-notification.service';
import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-channel-card',
  templateUrl: './youtube-channel-card.component.html',
  styleUrls: ['./youtube-channel-card.component.scss'],
})
export class YouTubeChannelCardComponent implements OnInit {
  @Input() channel: YouTubeChannel;

  unselectedPlaylists: Observable<YouTubePlaylist[]>;

  constructor(
    private readonly channelsService: YouTubeChannelsService,
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly youTubeQuery: YouTubeQuery,
    private readonly routingService: YouTubeRoutingService,
    private readonly notificationService: YouTubeNotificationService,
  ) {}

  ngOnInit() {
    this.unselectedPlaylists = this.youTubeQuery.getUnselectedPlaylistsInChannel(
      this.channel.id,
    );
  }

  onRemoveChannel() {
    this.channelsService
      .removeChannel(this.channel.id)
      .subscribe(() => this.routingService.navigateToChannelsPage());
  }

  onSelectPlaylist(playlistId: string) {
    this.playlistsService
      .selectPlaylist(this.channel.id, playlistId)
      .subscribe(() =>
        this.notificationService.onSuccessfulSelectedPlaylist(playlistId),
      );
  }

  onDeselectPlaylist(playlistId: string) {
    this.playlistsService
      .deselectPlaylist(this.channel.id, playlistId)
      .subscribe(() =>
        this.notificationService.onSuccessfulDeselectedPlaylist(playlistId),
      );
  }
}
