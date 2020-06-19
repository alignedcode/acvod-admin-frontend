import { NgModule } from '@angular/core';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ShortenPipe } from 'ngx-pipes';

import { ResolvableYouTubeChannel } from './pages/youtube/resolvers/youtube-channel.resolver';
import { ResolvableYouTubePlaylist } from './pages/youtube/resolvers/youtube-playlist.resolver';
import { YouTubeAuthDialogService } from './pages/youtube/services/youtube-auth-dialog.service';
import { YouTubeChannelPageService } from './pages/youtube/services/youtube-channel-page.service';
import { YouTubeNotificationService } from './pages/youtube/services/youtube-notification.service';
import { YouTubePlaylistPageService } from './pages/youtube/services/youtube-playlist-page.service';
import { YouTubeRoutingService } from './pages/youtube/services/youtube-routing.service';

import { AuthModule } from '@core/modules/auth/auth.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { VideoPlatformsRoutingModule } from './video-platforms-routing.module';

import { TableColumnTruncationPipe } from './pages/youtube/pipes/table-column-truncation.pipe';
import { VideoStorageStatePipe } from './pages/youtube/pipes/video-storage-state.pipe';

import { YouTubeAddChannelCardComponent } from './pages/youtube/components/youtube-add-channel-card/youtube-add-channel-card.component';
import { YouTubeAddPlaylistControlComponent } from './pages/youtube/components/youtube-add-playlist-control/youtube-add-playlist-control.component';
import { YouTubeChannelCardComponent } from './pages/youtube/components/youtube-channel-card/youtube-channel-card.component';
import { YouTubeChannelTableComponent } from './pages/youtube/components/youtube-channel-table/youtube-channel-table.component';
import { YouTubeNotBoundAccountDialogComponent } from './pages/youtube/components/youtube-not-bound-account-dialog/youtube-not-bound-account-dialog.component';
import { YouTubePlaylistCardComponent } from './pages/youtube/components/youtube-playlist-card/youtube-playlist-card.component';
import { YouTubePlaylistListComponent } from './pages/youtube/components/youtube-playlist-table/youtube-playlist-table.component';
import { YouTubePlaylistsTabComponent } from './pages/youtube/components/youtube-playlists-tab/youtube-playlists-tab.component';
import { YouTubeVideoTableComponent } from './pages/youtube/components/youtube-video-table/youtube-video-table.component';
import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubeChannelComponent } from './pages/youtube/pages/youtube-channel/youtube-channel.component';
import { YouTubeChannelsComponent } from './pages/youtube/pages/youtube-channels/youtube-channels.component';
import { YouTubePlaylistComponent } from './pages/youtube/pages/youtube-playlist/youtube-playlist.component';
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
    ResolvableYouTubeChannel,
    ResolvableYouTubePlaylist,
    YouTubeRoutingService,
    YouTubeNotificationService,
    YouTubeAuthDialogService,
    YouTubeChannelPageService,
    YouTubePlaylistPageService,
    TableColumnTruncationPipe,
    VideoStorageStatePipe,
    ShortenPipe,
  ],
  entryComponents: [YouTubeNotBoundAccountDialogComponent],
  declarations: [
    VideoPlatformsComponent,
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
    YouTubePlaylistComponent,
    YouTubePlaylistCardComponent,
    YouTubeVideoTableComponent,
    TableColumnTruncationPipe,
  ],
})
export class VideoPlatformsModule {}
