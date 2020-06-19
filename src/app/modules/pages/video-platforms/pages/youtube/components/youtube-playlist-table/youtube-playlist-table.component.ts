import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';

@Component({
  selector: 'youtube-playlist-table',
  templateUrl: './youtube-playlist-table.component.html',
  styleUrls: ['./youtube-playlist-table.component.scss'],
})
export class YouTubePlaylistListComponent implements OnInit {
  readonly ColumnMode = ColumnMode;
  readonly tableMessages = {
    emptyMessage:
      'There are no selected playlists in your channel, please add one.',
  };

  @Input() playlists: YouTubePlaylist[];
  @Output() deselectPlaylist$ = new EventEmitter<string>();
  @Output() navigateToPlaylistPage$ = new EventEmitter<string>();

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  columns: TableColumn[] = [];

  ngOnInit(): void {
    // TODO: Move into a service
    this.columns = [
      { name: 'ID', prop: 'id', minWidth: 300 },
      { name: 'Title', prop: 'title' },
      { name: 'Description', prop: 'description' },
      { name: 'Published At', prop: 'publishedAt' },
      { name: 'Videos', prop: 'videoCount' },
      { name: 'Actions', cellTemplate: this.actionsTemplate, prop: 'id' },
    ];
  }

  onDeselectPlaylist(playlistId: string) {
    this.deselectPlaylist$.emit(playlistId);
  }

  onNavigateToPlaylistPage(playlistId: string) {
    this.navigateToPlaylistPage$.emit(playlistId);
  }
}
