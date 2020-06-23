import { Injectable } from '@angular/core';

import { AddPlaylistDto } from '@core/modules/rest-api/models/playlist/add-playlist.dto';
import { PlaylistPrivacy } from '@core/modules/rest-api/models/playlist/playlist.dto';
import { PlaylistsService } from '@data/services/playlists.service';

@Injectable()
export class PlaylistAddModalService {
  public get privacyOptions(): Array<{ id: string; name: string }> {
    return Object.keys(PlaylistPrivacy).map((key) => ({
      id: PlaylistPrivacy[key],
      name: `${key[0]}${key.toLowerCase().slice(1)}`,
    }));
  }

  constructor(private readonly playlistsService: PlaylistsService) {}

  addPlaylist(playlist: AddPlaylistDto) {
    return this.playlistsService.addPlaylist(playlist);
  }
}
