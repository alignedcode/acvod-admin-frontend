import { Component, EventEmitter, Input, Output } from '@angular/core';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';

@Component({
  selector: 'youtube-playlists-tab',
  templateUrl: './youtube-playlists-tab.component.html',
  styleUrls: ['./youtube-playlists-tab.component.scss'],
})
export class YouTubePlaylistsTabComponent {
  @Input() selectedPlaylists: YouTubePlaylist[];
  @Input() unselectedPlaylists: YouTubePlaylist[];

  @Output() selectPlaylist$ = new EventEmitter<string>();
  @Output() deselectPlaylist$ = new EventEmitter<string>();
  @Output() navigateToPlaylistPage$ = new EventEmitter<string>();

  onSelectPlaylist(playlistId: string) {
    this.selectPlaylist$.emit(playlistId);
  }

  onDeselectPlaylist(playlistId: string) {
    this.deselectPlaylist$.emit(playlistId);
  }

  onNavigateToPlaylistPage(playlistId: string) {
    this.navigateToPlaylistPage$.emit(playlistId);
  }

  hasSelectedPlaylists() {
    return this.selectedPlaylists?.length > 0;
  }
}
