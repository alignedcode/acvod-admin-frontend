import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Page } from '@data/models/page';
import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';

@Component({
  selector: 'youtube-playlist-card',
  templateUrl: './youtube-playlist-card.component.html',
  styleUrls: ['./youtube-playlist-card.component.scss'],
})
export class YouTubePlaylistCardComponent {
  @Input() playlist: YouTubePlaylist;
  @Input() videoPage: Page;

  @Output() setVideoPage$ = new EventEmitter<number>();
  @Output() uploadVideo$ = new EventEmitter<string>();

  constructor() {}

  onUploadVideo(videoId: string) {
    this.uploadVideo$.emit(videoId);
  }

  onSetVideoPage(page: number) {
    this.setVideoPage$.emit(page);
  }
}
