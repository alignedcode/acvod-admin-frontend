import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { BloggersService } from './services/bloggers.service';
import { YouTubeChannelsService } from './services/video-providers/youtube/youtube-channels.service';
import { YouTubePlaylistsService } from './services/video-providers/youtube/youtube-playlists.service';
import { BloggerQuery } from './state/blogger/blogger.query';
import { BloggerStore } from './state/blogger/blogger.store';
import { YouTubeQuery } from './state/video-providers/youtube.query';
import { YouTubeStore } from './state/video-providers/youtube.store';

@NgModule({})
export class DataModule {
  static forRoot(): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [
        BloggerStore,
        BloggerQuery,
        YouTubeStore,
        YouTubeQuery,
        BloggersService,
        YouTubeChannelsService,
        YouTubePlaylistsService,
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    throwIfAlreadyLoaded(parentModule, DataModule.name);
  }
}
