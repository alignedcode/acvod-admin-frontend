import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubeChannelComponent } from './pages/youtube/pages/youtube-channel/youtube-channel.component';
import { YouTubeChannelsComponent } from './pages/youtube/pages/youtube-channels/youtube-channels.component';
import { YouTubePlaylistComponent } from './pages/youtube/pages/youtube-playlist/youtube-playlist.component';
import { VideoPlatformsRoutes } from './video-platforms-routes.enum';
import { VideoPlatformsComponent } from './video-platforms.component';

export const routes: Routes = [
  {
    path: VideoPlatformsRoutes.YOUTUBE,
    component: VideoPlatformsComponent,
    children: [
      {
        path: VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH,
        component: YouTubeApprovedAuthComponent,
      },
      {
        path: VideoPlatformsRoutes.YOUTUBE_CHANNELS,
        children: [
          { path: '', component: YouTubeChannelsComponent },
          {
            path: VideoPlatformsRoutes.YOUTUBE_CHANNEL,
            children: [
              { path: '', component: YouTubeChannelComponent },
              {
                path: VideoPlatformsRoutes.YOUTUBE_PLAYLISTS,
                children: [
                  {
                    path: VideoPlatformsRoutes.YOUTUBE_PLAYLIST,
                    component: YouTubePlaylistComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: VideoPlatformsRoutes.YOUTUBE_CHANNELS,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: VideoPlatformsRoutes.YOUTUBE,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class VideoPlatformsRoutingModule {}
