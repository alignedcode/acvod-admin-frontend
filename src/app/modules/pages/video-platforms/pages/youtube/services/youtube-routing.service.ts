import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { VideoPlatformsRoutes } from '@modules/pages/video-platforms/video-platforms-routes.enum';
import { AppRoutes } from 'app/app-route.enum';

@Injectable()
export class YouTubeRoutingService {
  constructor(private readonly router: Router) {}

  navigateToChannelsPage() {
    return this.router.navigateByUrl(
      `${AppRoutes.ROOT}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_CHANNELS}`,
    );
  }

  navigateToChannelPage(channelId: string) {
    return this.router.navigateByUrl(
      `${AppRoutes.ROOT}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_CHANNELS}/${channelId}`,
    );
  }

  navigateToPlaylistPage(channelId: string, playlistId: string) {
    return this.router.navigateByUrl(
      `${AppRoutes.ROOT}/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_CHANNELS}/${channelId}/playlist/${playlistId}`,
    );
  }
}
