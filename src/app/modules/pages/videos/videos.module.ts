import { NgModule } from '@angular/core';
import { NbDialogModule } from '@nebular/theme';
import { SharedModule } from '@shared/shared.module';

import { VideosTableComponent } from './components/videos-table/videos-table.component';
import { VideosTableService } from './components/videos-table/videos-table.service';
import { VideosPageComponent } from './pages/videos-page/videos-page.component';
import { ResolvableVideos } from './resolvers/videos.resolver';
import { VideosNotificationService } from './services/videos-notifiaction.service';
import { VideosRoutingModule } from './videos-routing.module';

@NgModule({
  declarations: [VideosTableComponent, VideosPageComponent],
  providers: [VideosNotificationService, VideosTableService, ResolvableVideos],
  imports: [NbDialogModule.forChild(), SharedModule, VideosRoutingModule],
})
export class VideosModule {}
