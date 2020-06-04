import { Component, Input } from '@angular/core';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';

@Component({
  selector: 'youtube-playlist-card',
  templateUrl: './youtube-playlist-card.component.html',
  styleUrls: ['./youtube-playlist-card.component.scss'],
})
export class YouTubePlaylistCardComponent {
  @Input() playlist: YouTubePlaylist;

  constructor() {}
}
