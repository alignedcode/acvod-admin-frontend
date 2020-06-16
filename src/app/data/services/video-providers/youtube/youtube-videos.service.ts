import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { YouTubeStore } from '@data/state/video-providers/youtube.store';
import { YouTubeVideoHttpService } from '@core/modules/rest-api/api/video-providers/youtube-video-http.service';

@Injectable()
export class YouTubeVideosService {
  constructor(
    private readonly videoService: YouTubeVideoHttpService,
    private readonly store: YouTubeStore,
  ) {}

  upload(channelId: string, videoId: string): Observable<any> {
    if (this.store.getValue().uploadableVideos.some((id) => id === videoId)) {
      this.store.update((state) => ({
        ...state,
        uploadableVideos: [...state.uploadableVideos, videoId],
      }));
    }

    return this.videoService.upload(channelId, videoId).pipe(
      tap(() =>
        this.store.update((state) => ({
          ...state,
          uploadableVideos: state.uploadableVideos.filter(
            (id) => id !== videoId,
          ),
        })),
      ),
    );
  }
}
