import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';

@Component({
  selector: 'youtube-add-playlist-control',
  templateUrl: './youtube-add-playlist-control.component.html',
  styleUrls: ['./youtube-add-playlist-control.component.scss'],
})
export class YouTubeAddPlaylistControlComponent {
  @Input() playlists: YouTubePlaylist[];
  @Output() selectPlaylist$: EventEmitter<string> = new EventEmitter();

  selectedPlaylistId: string;

  onSelectPlaylist() {
    this.selectPlaylist$.emit(this.selectedPlaylistId);
    this.selectedPlaylistId = null;
  }
}
