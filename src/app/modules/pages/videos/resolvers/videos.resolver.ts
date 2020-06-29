import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { Video } from '@data/models/video.entity';
import { VideosService } from '@data/services/videos.service';
import { VideosQuery } from '@data/state/videos/videos.query';
import { VideosNotificationService } from '../services/videos-notifiaction.service';

@Injectable()
export class ResolvableVideos
  implements Resolve<ResolvableData<Observable<Video[]>, string>> {
  constructor(
    private readonly videosService: VideosService,
    private readonly query: VideosQuery,
    private readonly notificationService: VideosNotificationService,
  ) {}

  resolve(): Observable<ResolvableData<Observable<Video[]>, string>> {
    return this.videosService.loadVideos().pipe(
      map(() => ({ data: this.query.videos$ })),
      catchError(() => {
        this.notificationService.onFailedLoadedVideos();

        // TODO: use a business error
        return of({ error: `Can't load videos` });
      }),
    );
  }
}
