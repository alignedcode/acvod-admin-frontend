import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubePlaylistPageService } from '../../services/youtube-playlist-page.service';

@Component({
  selector: 'youtube-playlist',
  templateUrl: './youtube-playlist.component.html',
  styleUrls: ['./youtube-playlist.component.scss'],
})
export class YouTubePlaylistComponent implements OnInit {
  playlist: Observable<YouTubePlaylist>;

  constructor(
    private readonly pageService: YouTubePlaylistPageService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.playlist = this.pageService.getPlaylist(this.route);

    this.pageService.loadVideos(this.route).subscribe();
  }
}
