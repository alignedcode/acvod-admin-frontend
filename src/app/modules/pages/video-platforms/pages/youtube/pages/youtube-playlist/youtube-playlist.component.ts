import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { Page } from '@data/models/page';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubePlaylistPageService } from '../../services/youtube-playlist-page.service';

export interface YouTubePlaylistComponentRouteData {
  playlist: ResolvableData<Observable<YouTubePlaylist>, string>;
}

@Component({
  selector: 'youtube-playlist',
  templateUrl: './youtube-playlist.component.html',
  styleUrls: ['./youtube-playlist.component.scss'],
})
export class YouTubePlaylistComponent implements OnInit {
  playlist$: Observable<YouTubePlaylist>;
  videoPage$: Observable<Page>;

  constructor(
    private readonly pageService: YouTubePlaylistPageService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map(
          ({
            playlist: { data, error },
          }: YouTubePlaylistComponentRouteData) => {
            if (data) {
              return data;
            }

            return throwError(error);
          },
        ),
      )
      .subscribe((playlist$) => {
        this.playlist$ = playlist$;

        this.pageService.loadVideoPage(this.route).subscribe();
        this.videoPage$ = this.pageService.videoPage$;
      });
  }

  onSetPage(pageNumber: number) {
    this.pageService.loadVideoPage(this.route, pageNumber).subscribe();
  }
}
