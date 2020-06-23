import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResolvableData } from '@core/models/resolvable-data.model';
import { Playlist } from '@data/models/playlist.entity';
import { PlaylistsModalService } from '../../services/playlists-modal.service';

export interface PlaylistsComponentRouteData {
  playlists: ResolvableData<Observable<Playlist[]>, string>;
}

@Component({
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss'],
})
export class PlaylistsPageComponent implements OnInit {
  playlists$: Observable<Playlist[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modalService: PlaylistsModalService,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map(({ playlists: { data, error } }: PlaylistsComponentRouteData) => {
          if (data) {
            return data;
          }

          return throwError(error);
        }),
      )
      .subscribe((playlists$) => (this.playlists$ = playlists$));
  }

  onAddPlaylist() {
    this.modalService.showAddNewPlaylistModal();
  }
}
