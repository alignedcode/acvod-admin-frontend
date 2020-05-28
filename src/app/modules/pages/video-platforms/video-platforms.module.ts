import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { YouTubeChannelCardComponent } from './pages/youtube/components/youtube-channel-card/youtube-channel-card.component';
import { YouTubeChannelListComponent } from './pages/youtube/components/youtube-channel-list/youtube-channel-list.component';
import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubePlatformComponent } from './pages/youtube/youtube-platform.component';
import { VideoPlatformsRoutingModule } from './video-platforms-routing.module';

@NgModule({
  imports: [SharedModule, AuthModule, VideoPlatformsRoutingModule],
  declarations: [
    YouTubePlatformComponent,
    YouTubeApprovedAuthComponent,
    YouTubeChannelCardComponent,
    YouTubeChannelListComponent,
  ],
})
export class VideoPlatformsModule {}
