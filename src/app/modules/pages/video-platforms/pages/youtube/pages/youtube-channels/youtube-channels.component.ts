import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeChannelsService } from '@data/services/video-providers/youtube/youtube-channels.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { VideoPlatformsRoutes } from '@modules/pages/video-platforms/video-platforms-routes.enum';
import { environment } from 'environments/environment';

@Component({
  selector: 'youtube-channels',
  styleUrls: ['./youtube-channels.component.scss'],
  templateUrl: './youtube-channels.component.html',
})
export class YouTubeChannelsComponent implements OnInit {
  readonly channels$: Observable<YouTubeChannel[]>;

  constructor(
    private readonly channelsService: YouTubeChannelsService,
    private readonly query: YouTubeQuery,
  ) {
    this.channels$ = query.channels$;
  }

  ngOnInit() {
    this.channelsService.loadChannels().subscribe();
  }

  onAddChannel() {
    this.channelsService.addChannel(
      `${environment.fronendURI}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH}`,
    );
  }
}
