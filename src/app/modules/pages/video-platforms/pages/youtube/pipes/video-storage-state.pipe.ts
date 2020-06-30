import { Pipe, PipeTransform } from '@angular/core';

import { VideoStorageState } from '@core/modules/rest-api/models/video/video-storage-state.enum';
import { VideoStorageStateName } from '@data/models/video-providers/youtube/youtube-video.entity';

@Pipe({
  name: 'videoStorageState',
})
export class VideoStorageStatePipe implements PipeTransform {
  transform(videoStorageState: VideoStorageState): string {
    switch (videoStorageState) {
      case VideoStorageState.SAVED:
        return VideoStorageStateName.SAVED;
      case VideoStorageState.IN_PROGRESS:
        return VideoStorageStateName.IN_PROGRESS;
      default:
        return VideoStorageStateName.NONE;
    }
  }
}
