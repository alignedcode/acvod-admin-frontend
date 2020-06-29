import { HttpClient } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { BloggersHttpService } from './api/bloggers-http.service';
import { PlaylistsHttpService } from './api/playlists-http.service';
import { YouTubeChannelsHttpService } from './api/video-providers/youtube-channels-http.service';
import { YouTubePlaylistsHttpService } from './api/video-providers/youtube-playlists-http.service';
import { YouTubeVideoHttpService } from './api/video-providers/youtube-video-http.service';
import { VideosHttpService } from './api/videos-http.service';

@NgModule({
  providers: [
    BloggersHttpService,
    YouTubeChannelsHttpService,
    YouTubePlaylistsHttpService,
    YouTubeVideoHttpService,
    PlaylistsHttpService,
    VideosHttpService,
  ],
})
export class RestApiModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: RestApiModule };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: RestApiModule,
    http: HttpClient,
  ) {
    throwIfAlreadyLoaded(parentModule, RestApiModule.name);
  }
}
