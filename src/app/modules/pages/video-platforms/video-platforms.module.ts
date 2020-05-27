import { NgModule } from '@angular/core';

import { AuthModule } from '@core/modules/auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { YouTubeApprovedAuthComponent } from './pages/youtube/pages/youtube-approved-auth/youtube-approved-auth.component';
import { YouTubePlatformComponent } from './pages/youtube/youtube-platform.component';
import { VideoPlatformsRoutingModule } from './video-platforms-routing.module';

@NgModule({
  imports: [SharedModule, AuthModule, VideoPlatformsRoutingModule],
  declarations: [YouTubePlatformComponent, YouTubeApprovedAuthComponent],
})
export class VideoPlatformsModule {}
