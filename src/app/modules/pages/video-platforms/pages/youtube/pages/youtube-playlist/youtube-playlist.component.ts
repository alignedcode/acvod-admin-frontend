import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Page } from '@data/models/page';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubePlaylistPageService } from '../../services/youtube-playlist-page.service';

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
    this.pageService.tryToGetPlaylist(this.route).subscribe((playlist$) => {
      this.playlist$ = playlist$;
      this.videoPage$ = this.pageService.videoPage$;

      this.pageService.loadVideoPage(this.route).subscribe();
    });
  }

  onSetPage(pageNumber: number) {
    this.pageService.loadVideoPage(this.route, pageNumber).subscribe();
  }
}
