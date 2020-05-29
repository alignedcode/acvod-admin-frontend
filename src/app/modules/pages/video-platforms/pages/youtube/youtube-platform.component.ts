import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { environment } from 'environments/environment';
import { VideoPlatformsRoutes } from '../../video-platforms-routes.enum';

@Component({
  selector: 'youtube-platform',
  styleUrls: ['./youtube-platform.component.scss'],
  templateUrl: './youtube-platform.component.html',
})
export class YouTubePlatformComponent implements OnInit {
  constructor(private readonly channelsService: YouTubeChannelsService) {}

  ngOnInit() {
    this.channelsService.loadChannels().subscribe();
  }

  onAddChannel() {
    this.channelsService.addChannel(
      `${environment.fronendURI}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH}`,
    );
  }
}
