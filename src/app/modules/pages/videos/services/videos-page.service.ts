import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { VideoStorageState } from '@core/modules/rest-api/models/video/video-storage-state.enum';
import { VideosService } from '@data/services/videos.service';
import { getOnlyFileName } from './file-metadata.service';
import { VideoUploadingService } from './video-uploading.service';

@Injectable()
export class VideosPageService {
  constructor(
    private readonly videosService: VideosService,
    private readonly uploadingService: VideoUploadingService,
  ) {}

  uploadVideo(file: File) {
    return this.videosService
      .addOne({
        source: { provider: 'local' },
        title: getOnlyFileName(file.name),
        description: '',
        storageState: VideoStorageState.NONE,
      })
      .pipe(
        map((createdVideo) => {
          const {
            progress$,
            error$,
            success$,
          } = this.uploadingService.uploadVideo(createdVideo, file);

          return {
            progress$,
            error$: error$.pipe(
              tap(() => this.videosService.removeOne(createdVideo.id)),
            ),
            success$,
          };
        }),
      );
  }
}
