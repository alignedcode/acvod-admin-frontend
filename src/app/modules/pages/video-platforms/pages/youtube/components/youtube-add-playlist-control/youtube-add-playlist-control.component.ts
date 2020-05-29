import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'youtube-add-playlist-control',
  templateUrl: './youtube-add-playlist-control.component.html',
  styleUrls: ['./youtube-add-playlist-control.component.scss'],
})
export class YoutubeAddPlaylistControlComponent implements OnInit {
  @Input() channelId: string;

  @ViewChild('playlistsSearchControl', { static: true })
  playlistSearch: NgSelectComponent;

  unselectedPlaylists$: Observable<YouTubePlaylist[]> = of([]);
  selectedPlaylistId: string;

  constructor(
    private readonly playlistsService: YouTubePlaylistsService,
    private readonly query: YouTubeQuery,
  ) {}

  ngOnInit(): void {
    this.unselectedPlaylists$ = this.query.getUnselectedPlaylistsInChannel(
      this.channelId,
    );
  }

  onSelectPlaylist() {
    this.playlistsService
      .selectPlaylist(this.channelId, this.selectedPlaylistId)
      .subscribe(() => {
        this.selectedPlaylistId = null;
      });
  }
}
