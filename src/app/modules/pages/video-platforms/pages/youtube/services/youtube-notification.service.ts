import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable()
export class YouTubeNotificationService {
  private readonly ON_SUCCESSFUL_SELECTED_PLAYLIST_NOTIFICATION_TITLE =
    'Playlist was selected';
  private readonly ON_SUCCESSFUL_DESELECTED_PLAYLIST_NOTIFICATION_TITLE =
    'Playlist was deselected';

  private readonly NOTIFICATION_POSITION =
    NbGlobalPhysicalPosition.BOTTOM_RIGHT;

  constructor(private readonly toastService: NbToastrService) {}

  onSuccessfulSelectedPlaylist(playlistId: string) {
    this.toastService.success(
      `ID: ${playlistId}`,
      this.ON_SUCCESSFUL_SELECTED_PLAYLIST_NOTIFICATION_TITLE,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }

  onSuccessfulDeselectedPlaylist(playlistId: string) {
    this.toastService.success(
      `ID: ${playlistId}`,
      this.ON_SUCCESSFUL_DESELECTED_PLAYLIST_NOTIFICATION_TITLE,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }
}
