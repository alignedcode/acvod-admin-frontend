import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { YoutubeAddPlaylistControlComponent } from './pages/youtube/components/youtube-add-playlist-control/youtube-add-playlist-control.component';
import { YouTubeChannelCardComponent } from './pages/youtube/components/youtube-channel-card/youtube-channel-card.component';
import { YouTubeChannelListComponent } from './pages/youtube/components/youtube-channel-list/youtube-channel-list.component';
import { YoutubePlaylistListComponent } from './pages/youtube/components/youtube-playlist-list/youtube-playlist-list.component';
import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YoutubeChannelComponent } from './pages/youtube/pages/youtube-channel/youtube-channel.component';
import { YouTubeChannelsComponent } from './pages/youtube/pages/youtube-channels/youtube-channels.component';
import { YouTubeRoutingService } from './pages/youtube/services/youtube-routing.service';
import { VideoPlatformsRoutingModule } from './video-platforms-routing.module';

@NgModule({
  imports: [SharedModule, AuthModule, VideoPlatformsRoutingModule],
  providers: [YouTubeRoutingService],
  declarations: [
    YouTubeChannelsComponent,
    YoutubeChannelComponent,
    YouTubeApprovedAuthComponent,
    YouTubeChannelCardComponent,
    YouTubeChannelListComponent,
    YoutubeAddPlaylistControlComponent,
    YoutubePlaylistListComponent,
  ],
})
export class VideoPlatformsModule {}
