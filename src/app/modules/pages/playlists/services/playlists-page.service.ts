import { Injectable } from '@angular/core';
import { PlaylistsModalService } from './playlists-modal.service';

@Injectable()
export class PlaylistsPageService {
  constructor(private readonly modalService: PlaylistsModalService) {}

  addPlaylist() {
    this.modalService.showAddNewPlaylistModal();
  }
}
