import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { LayoutModule } from '@layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { ContentLayoutRoutingModule } from './content-layout-routing.module';
import { ContentLayoutComponent } from './content-layout.component';
import { AccountShortSummaryModule } from './pages/account-short-summary/account-short-summary.module';
import { AccountModule } from './pages/account/account.module';
import { PlaylistsModule } from './pages/playlists/playlists.module';
import { VideoPlatformsModule } from './pages/video-platforms/video-platforms.module';

@NgModule({
  imports: [
    NbMenuModule,
    ContentLayoutRoutingModule,
    LayoutModule,
    ComponentsModule,
    AccountShortSummaryModule,
    AccountModule,
    VideoPlatformsModule,
    PlaylistsModule,
  ],
  declarations: [ContentLayoutComponent],
})
export class ContentLayoutModule {}
