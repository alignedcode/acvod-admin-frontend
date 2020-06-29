import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { Video } from '@data/models/video.entity';

export interface VideosComponentRouteData {
  videos: ResolvableData<Observable<Video[]>, string>;
}

@Component({
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss'],
})
export class VideosPageComponent implements OnInit {
  videos$: Observable<Video[]>;

  constructor(private readonly route: ActivatedRoute) {}

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
}
