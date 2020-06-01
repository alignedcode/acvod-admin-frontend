import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, zip } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-channel',
  templateUrl: './youtube-channel.component.html',
  styleUrls: ['./youtube-channel.component.scss'],
})
export class YoutubeChannelComponent {
  channel$: Observable<YouTubeChannel>;

  constructor(
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly routingService: YouTubeRoutingService,
    private readonly query: YouTubeQuery,
    private readonly route: ActivatedRoute,
  ) {
    const channelId = this.route.snapshot.paramMap.get('channelId');

    if (!channelId) {
      this.routingService.navigateToChannelsPage();
    }

    this.channel$ = this.query.getChannel(channelId);

    // TODO: Move into a component service
    zip(
      this.playlistsService.loadAllPlaylists(channelId),
      this.playlistsService.loadSelectedPlaylists(channelId),
    ).subscribe();
  }
}
