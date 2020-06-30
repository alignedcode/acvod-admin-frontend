import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { VideosHttpService } from '@core/modules/rest-api/api/videos-http.service';
import { AddVideoDto } from '@core/modules/rest-api/models/video/add-video.dto';
import { Video } from '@data/models/video.entity';
import { VideosStore } from '@data/state/videos/videos.store';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosApiService: VideosHttpService,
    private readonly videosStore: VideosStore,
  ) {}

  loadAll(): Observable<Video[]> {
    return this.videosApiService.getAll().pipe(
      tap((videos) => {
        this.videosStore.update({
          videos,
        });
      }),
    );
  }

  addOne(video: AddVideoDto): Observable<Video> {
    return this.videosApiService.addOne(video).pipe(
      tap((createdVideo) => {
        this.videosStore.update((state) => ({
          ...state,
          videos: [createdVideo, ...state.videos],
        }));
      }),
    );
  }

  removeOne(videoId: string) {
    return this.videosApiService.removeOne(videoId).pipe(
      tap(() => {
        this.videosStore.update((state) => ({
          ...state,
          videos: state.videos.filter(({ id }) => id !== videoId),
        }));
      }),
    );
  }
}
