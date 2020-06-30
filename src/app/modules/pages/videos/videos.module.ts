import { NgModule } from '@angular/core';
import { NbDialogModule } from '@nebular/theme';
import { SharedModule } from '@shared/shared.module';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { VideosTableComponent } from './components/videos-table/videos-table.component';
import { VideosTableService } from './components/videos-table/videos-table.service';
import { VideosPageComponent } from './pages/videos-page/videos-page.component';
import { ResolvableVideos } from './resolvers/videos.resolver';
import { VideoUploadingService } from './services/video-uploading.service';
import { VideosNotificationService } from './services/videos-notifiaction.service';
import { VideosPageService } from './services/videos-page.service';
import { VideosRoutingModule } from './videos-routing.module';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1,
};

@NgModule({
  declarations: [VideosTableComponent, VideosPageComponent],
  providers: [
    VideosNotificationService,
    VideosTableService,
    ResolvableVideos,
    VideoUploadingService,
    VideosPageService,
  ],
  imports: [
    NbDialogModule.forChild(),
    InputFileModule.forRoot(config),
    SharedModule,
    VideosRoutingModule,
  ],
})
export class VideosModule {}
