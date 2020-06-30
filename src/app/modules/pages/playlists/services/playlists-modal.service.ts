import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { AddPlaylistDto } from '@core/modules/rest-api/models/playlist/add-playlist.dto';
import { PlaylistPrivacy } from '@core/modules/rest-api/models/playlist/playlist.dto';
import { PlaylistAddModalComponent } from '../components/playlist-add-modal/playlist-add-modal.component';

@Injectable()
export class PlaylistsModalService {
  constructor(private dialogService: NbDialogService) {}

  showAddNewPlaylistModal(
    initialModel: Partial<AddPlaylistDto> = {
      privacy: PlaylistPrivacy.PRIVATE,
    },
  ) {
    this.dialogService.open(PlaylistAddModalComponent, {
      context: { initialModel },
    });
  }
}
