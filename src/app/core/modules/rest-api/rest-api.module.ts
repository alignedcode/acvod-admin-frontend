import { HttpClient } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { BloggerHttpService } from './api/blogger-http.service';
import { YouTubeChannelsHttpService } from './api/video-providers/youtube-channels-http.service';
import { YouTubePlaylistsHttpService } from './api/video-providers/youtube-playlists-http.service';

@NgModule({
  providers: [
    BloggerHttpService,
    YouTubeChannelsHttpService,
    YouTubePlaylistsHttpService,
  ],
})
export class RestApiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RestApiModule,
      providers: [],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: RestApiModule,
    http: HttpClient,
  ) {
    throwIfAlreadyLoaded(parentModule, RestApiModule.name);
  }
}
