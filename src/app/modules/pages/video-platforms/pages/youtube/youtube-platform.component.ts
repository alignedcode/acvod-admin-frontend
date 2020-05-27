import { Component } from '@angular/core';

import { YouTubeChannelsService } from '@data/services/video-platforms/youtube/youtube-channels.service';
import { environment } from 'environments/environment';
import { VideoPlatformsRoutes } from '../../video-platforms-routes.enum';

@Component({
  selector: 'youtube-platform',
  styleUrls: ['./youtube-platform.component.scss'],
  templateUrl: './youtube-platform.component.html',
})
export class YouTubePlatformComponent {
  constructor(private readonly channelsService: YouTubeChannelsService) {}

  onAddChannel() {
    this.channelsService.addChannel(
      `${environment.fronendURI}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH}`,
    );
  }
}
