import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeChannelPageService } from '../../services/youtube-channel-page.service';

export interface YouTubeChannelComponentRouteData {
  channel: ResolvableData<Observable<YouTubeChannel>, string>;
}

@Component({
  selector: 'youtube-channel',
  templateUrl: './youtube-channel.component.html',
  styleUrls: ['./youtube-channel.component.scss'],
})
export class YouTubeChannelComponent implements OnInit {
  channel$: Observable<YouTubeChannel>;

  constructor(
    private readonly pageService: YouTubeChannelPageService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map(
          ({ channel: { data, error } }: YouTubeChannelComponentRouteData) => {
            if (data) {
              return data;
            }

            return throwError(error);
          },
        ),
      )
      .subscribe(
        (channel$) => {
          this.channel$ = channel$;

          this.pageService.loadPlaylists(this.route).subscribe();
        }
      );
  }
}
