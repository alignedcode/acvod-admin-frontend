import { NgModule } from '@angular/core';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';

import { AuthModule } from '@core/modules/auth/auth.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { YouTubeAddChannelCardComponent } from './pages/youtube/components/youtube-add-channel-card/youtube-add-channel-card.component';
import { YouTubeAddPlaylistControlComponent } from './pages/youtube/components/youtube-add-playlist-control/youtube-add-playlist-control.component';
import { YouTubeChannelCardComponent } from './pages/youtube/components/youtube-channel-card/youtube-channel-card.component';
import { YouTubeChannelTableComponent } from './pages/youtube/components/youtube-channel-table/youtube-channel-table.component';
import { YouTubeNotBoundAccountDialogComponent } from './pages/youtube/components/youtube-not-bound-account-dialog/youtube-not-bound-account-dialog.component';
import { YouTubePlaylistListComponent } from './pages/youtube/components/youtube-playlist-table/youtube-playlist-table.component';
import { YouTubePlaylistsTabComponent } from './pages/youtube/components/youtube-playlists-tab/youtube-playlists-tab/youtube-playlists-tab.component';
import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubeChannelComponent } from './pages/youtube/pages/youtube-channel/youtube-channel.component';
import { YouTubeChannelsComponent } from './pages/youtube/pages/youtube-channels/youtube-channels.component';
import { YouTubeNotBoundAccountComponent } from './pages/youtube/pages/youtube-not-bound-account/youtube-not-bound-account.component';
import { YouTubeAuthDialogService } from './pages/youtube/services/youtube-auth-dialog.service';
import { YouTubeNotificationService } from './pages/youtube/services/youtube-notification.service';
import { YouTubeRoutingService } from './pages/youtube/services/youtube-routing.service';
import { VideoPlatformsRoutingModule } from './video-platforms-routing.module';
import { VideoPlatformsComponent } from './video-platforms.component';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    LayoutModule,
    VideoPlatformsRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  providers: [
    YouTubeRoutingService,
    YouTubeNotificationService,
    YouTubeAuthDialogService,
  ],
  entryComponents: [YouTubeNotBoundAccountDialogComponent],
  declarations: [
    VideoPlatformsComponent,
    YouTubeNotBoundAccountComponent,
    YouTubeNotBoundAccountDialogComponent,
    YouTubeChannelsComponent,
    YouTubeAddChannelCardComponent,
    YouTubeChannelComponent,
    YouTubeApprovedAuthComponent,
    YouTubeChannelCardComponent,
    YouTubeChannelTableComponent,
    YouTubeAddPlaylistControlComponent,
    YouTubePlaylistsTabComponent,
    YouTubePlaylistListComponent,
  ],
})
export class VideoPlatformsModule {}
