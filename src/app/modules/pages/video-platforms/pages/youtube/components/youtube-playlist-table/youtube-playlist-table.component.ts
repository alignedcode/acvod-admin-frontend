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
export class YoutubePlaylistListComponent implements OnInit {
  readonly ColumnMode = ColumnMode;

  @Input() playlists: YouTubePlaylist[];
  @Output() deselectPlaylist$: EventEmitter<string> = new EventEmitter();

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
}