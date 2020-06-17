import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResolvableYouTubeChannel } from './pages/youtube/resolvers/youtube-channel.resolver';
import { ResolvableYouTubePlaylist } from './pages/youtube/resolvers/youtube-playlist.resolver';

import { VideoPlatformsRoutes } from './video-platforms-routes.enum';

import { BreadcrumbRouteData } from '@layout/models/breadcrumb-route-data.enum';
import { SkippedBreadcrumb } from '@layout/models/skipped-breadcrumb';
import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubeChannelComponent } from './pages/youtube/pages/youtube-channel/youtube-channel.component';
import { YouTubeChannelsComponent } from './pages/youtube/pages/youtube-channels/youtube-channels.component';
import { YouTubePlaylistComponent } from './pages/youtube/pages/youtube-playlist/youtube-playlist.component';
import { VideoPlatformsComponent } from './video-platforms.component';

export const routes: Routes = [
  {
    path: VideoPlatformsRoutes.YOUTUBE,
    data: {
      [BreadcrumbRouteData.LABEL]: 'YouTube',
    },
    component: VideoPlatformsComponent,
    children: [
      {
        path: VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH,
        component: YouTubeApprovedAuthComponent,
      },
      {
        path: VideoPlatformsRoutes.YOUTUBE_CHANNELS,
        data: {
          [BreadcrumbRouteData.LABEL]: 'Channels',
        },
        children: [
          {
            path: '',
            data: {
              [BreadcrumbRouteData.LABEL]: SkippedBreadcrumb,
            },
            component: YouTubeChannelsComponent,
          },
          {
            path: VideoPlatformsRoutes.YOUTUBE_CHANNEL,
            data: {
              [BreadcrumbRouteData.LABEL]: 'Channel',
            },
            children: [
              {
                path: '',
                component: YouTubeChannelComponent,
                data: {
                  [BreadcrumbRouteData.LABEL]: SkippedBreadcrumb,
                },
                resolve: { channel: ResolvableYouTubeChannel },
              },
              {
                path: VideoPlatformsRoutes.YOUTUBE_PLAYLISTS,
                data: {
                  [BreadcrumbRouteData.LABEL]: SkippedBreadcrumb,
                },
                children: [
                  {
                    path: VideoPlatformsRoutes.YOUTUBE_PLAYLIST,
                    data: {
                      [BreadcrumbRouteData.LABEL]: 'Playlist',
                    },
                    component: YouTubePlaylistComponent,
                    resolve: { playlist: ResolvableYouTubePlaylist },
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
