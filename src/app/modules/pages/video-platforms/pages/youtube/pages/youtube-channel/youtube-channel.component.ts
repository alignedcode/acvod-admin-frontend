import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { Observable, zip } from 'rxjs';
import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-channel',
  templateUrl: './youtube-channel.component.html',
  styleUrls: ['./youtube-channel.component.scss'],
})
export class YoutubeChannelComponent implements OnInit {
  channel$: Observable<YouTubeChannel>;

  constructor(
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly routingService: YouTubeRoutingService,
    private readonly query: YouTubeQuery,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const channelId = params['channelId'];

      if (!channelId) {
        this.routingService.navigateToChannelsPage();
      }

      this.channel$ = this.query.getChannel(channelId);

      zip(
        this.playlistsService.loadAllPlaylists(channelId),
        this.playlistsService.loadSelectedPlaylists(channelId),
      ).subscribe();
    });
  }
}
