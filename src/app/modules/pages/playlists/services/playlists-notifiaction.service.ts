import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable()
export class PlaylistsNotificationService {
  // TODO: move into a providable entity
  private readonly ON_SUCCESSFUL_LOADED_PLAYLISTS = 'Loading is complited';
  private readonly ON_FAILED_LOADED_PLAYLISTS =
    'There was an error in the playlists loading process';

  private readonly NOTIFICATION_POSITION =
    NbGlobalPhysicalPosition.BOTTOM_RIGHT;

  constructor(private readonly toastService: NbToastrService) {}

  onSuccessfulLoadedPlaylists() {
    this.toastService.success(
      'Playlists',
      this.ON_SUCCESSFUL_LOADED_PLAYLISTS,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }

  onFailedLoadedPlaylists() {
    this.toastService.danger('Playlists', this.ON_FAILED_LOADED_PLAYLISTS, {
      position: this.NOTIFICATION_POSITION,
    });
  }
}
