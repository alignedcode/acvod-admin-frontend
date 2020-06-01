import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Observable, of } from 'rxjs';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';

@Component({
  selector: 'youtube-add-playlist-control',
  templateUrl: './youtube-add-playlist-control.component.html',
  styleUrls: ['./youtube-add-playlist-control.component.scss'],
})
export class YoutubeAddPlaylistControlComponent implements OnInit {
  @Input() channelId: string;
  @Output() selectPlaylist$: EventEmitter<string> = new EventEmitter();

  unselectedPlaylists$: Observable<YouTubePlaylist[]> = of([]);
  selectedPlaylistId: string;

  constructor(private readonly query: YouTubeQuery) {}

  ngOnInit(): void {
    // TODO: Move into a control service
    this.unselectedPlaylists$ = this.query.getUnselectedPlaylistsInChannel(
      this.channelId,
    );
  }

  onSelectPlaylist() {
    this.selectPlaylist$.emit(this.selectedPlaylistId);
    this.selectedPlaylistId = null;
  }
}
