import { Component, Input, OnInit } from '@angular/core';

import { Playlist } from '@data/models/playlist.entity';
import { PlaylistsTableService } from './playlists-table.service';

@Component({
  selector: 'playlists-table',
  templateUrl: './playlists-table.component.html',
  styleUrls: ['./playlists-table.component.scss'],
})
export class PlaylistsTableComponent implements OnInit {
  @Input() playlists: Playlist[] = [];

  get columnDefs() {
    return this.service.columnDefs;
  }

  constructor(private readonly service: PlaylistsTableService) {}

  ngOnInit() {}
}
