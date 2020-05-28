import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { YouTubeChannel } from '@core/modules/rest-api/models/video-providers/youtube/youtube-channel.model';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { environment } from 'environments/environment';
import { VideoPlatformsRoutes } from '../../video-platforms-routes.enum';

@Component({
  selector: 'youtube-platform',
  styleUrls: ['./youtube-platform.component.scss'],
  templateUrl: './youtube-platform.component.html',
})
export class YouTubePlatformComponent implements OnInit, OnDestroy {
  channels: YouTubeChannel[] = [];

  private subscriptions: { onChannelsChange: Subscription };

  constructor(private readonly channelsService: YouTubeChannelsService) {
    this.subscriptions = {
      onChannelsChange: channelsService.onChannelsChange.subscribe(
        (channels) => (this.channels = channels),
      ),
    };
  }

  ngOnInit() {
    this.channelsService
      .getChannels()
      .subscribe((channels) => (this.channels = channels));
  }

  ngOnDestroy() {
    this.subscriptions.onChannelsChange.unsubscribe();
  }

  onAddChannel() {
    this.channelsService.addChannel(
      `${environment.fronendURI}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH}`,
    );
  }
}
