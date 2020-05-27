import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubePlatformComponent } from './pages/youtube/youtube-platform.component';
import { VideoPlatformsRoutes } from './video-platforms-routes.enum';

export const routes: Routes = [
  {
    path: VideoPlatformsRoutes.YOUTUBE,
    children: [
      { path: '', component: YouTubePlatformComponent },
      {
        path: VideoPlatformsRoutes.YOUTUBE_APPROVED_AUTH,
        component: YouTubeApprovedAuthComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class VideoPlatformsRoutingModule {}
