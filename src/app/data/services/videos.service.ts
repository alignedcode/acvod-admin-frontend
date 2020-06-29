import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { VideosHttpService } from '@core/modules/rest-api/api/videos-http.service';
import { Video } from '@data/models/video.entity';
import { VideosStore } from '@data/state/videos/videos.store';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosApiService: VideosHttpService,
    private readonly videosStore: VideosStore,
  ) {}

  loadVideos(): Observable<Video[]> {
    return this.videosApiService.getVideos().pipe(
      tap((videos) => {
        this.videosStore.update({
          videos,
        });
      }),
    );
  }
}
