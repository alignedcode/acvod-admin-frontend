import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';

import { BloggersService } from './services/bloggers.service';
import { PlaylistsService } from './services/playlists.service';
import { YouTubeChannelsService } from './services/video-providers/youtube/youtube-channels.service';
import { YouTubePlaylistsService } from './services/video-providers/youtube/youtube-playlists.service';
import { YouTubeVideosService } from './services/video-providers/youtube/youtube-videos.service';

import { VideosService } from './services/videos.service';
import { BloggerQuery } from './state/blogger/blogger.query';
import { BloggerStore } from './state/blogger/blogger.store';
import { PlaylistsQuery } from './state/playlists/playlists.query';
import { PlaylistsStore } from './state/playlists/playlists.store';
import { YouTubeQuery } from './state/video-providers/youtube.query';
import { YouTubeStore } from './state/video-providers/youtube.store';
import { VideosQuery } from './state/videos/videos.query';
import { VideosStore } from './state/videos/videos.store';

@NgModule({})
export class DataModule {
  static forRoot(): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [
        BloggerStore,
        BloggerQuery,
        PlaylistsStore,
        PlaylistsQuery,
        YouTubeStore,
        YouTubeQuery,
        BloggersService,
        PlaylistsService,
        PlaylistsStore,
        VideosStore,
        VideosQuery,
        VideosService,
        YouTubeChannelsService,
        YouTubePlaylistsService,
        YouTubeVideosService,
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    throwIfAlreadyLoaded(parentModule, DataModule.name);
  }
}
