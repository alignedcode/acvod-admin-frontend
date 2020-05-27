import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { BloggersService } from './services/bloggers.service';
import { YouTubeChannelsService } from './services/video-platforms/youtube/youtube-channels.service';

@NgModule({})
export class DataModule {
  static forRoot(): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [BloggersService, YouTubeChannelsService],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    throwIfAlreadyLoaded(parentModule, DataModule.name);
  }
}
