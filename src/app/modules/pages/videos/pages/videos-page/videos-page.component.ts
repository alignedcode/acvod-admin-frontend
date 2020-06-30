import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { Video } from '@data/models/video.entity';
import { StartedUpload } from '../../services/video-uploading.service';
import { VideosPageService } from '../../services/videos-page.service';

export interface VideosComponentRouteData {
  videos: ResolvableData<Observable<Video[]>, string>;
}

@Component({
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss'],
})
export class VideosPageComponent implements OnInit {
  videos$: Observable<Video[]>;

  uploadableVideos: Array<{ file: File }>;

  uploadingState?: StartedUpload;

  public get hasUploadableVideos(): boolean {
    return this.uploadableVideos && this.uploadableVideos.length > 0;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageService: VideosPageService,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map(({ videos: { data, error } }: VideosComponentRouteData) => {
          if (data) {
            return data;
          }

          return throwError(error);
        }),
      )
      .subscribe((videos$) => (this.videos$ = videos$));
  }

  uploadVideo() {
    if (this.hasUploadableVideos) {
      this.pageService
        .uploadVideo(this.uploadableVideos[0].file)
        .pipe(
          tap((startedUpload) => {
            this.uploadingState = startedUpload;
          }),
        )
        .subscribe(({ success$ }) => {
          success$.subscribe(() => (this.uploadingState = undefined));
        });
    }
  }
}
