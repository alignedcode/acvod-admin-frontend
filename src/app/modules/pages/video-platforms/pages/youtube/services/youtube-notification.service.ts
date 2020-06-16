import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable()
export class YouTubeNotificationService {
  // TODO: move into a providable entity
  private readonly ON_SUCCESSFUL_SELECTED_PLAYLIST_NOTIFICATION_TITLE =
    'Playlist was selected';
  private readonly ON_SUCCESSFUL_DESELECTED_PLAYLIST_NOTIFICATION_TITLE =
    'Playlist was deselected';
  private readonly ON_CHANNEL_NOT_FOUND_TITLE = 'Channel not found';
  private readonly ON_PLAYLIST_NOT_FOUND_TITLE =
    'Playlist not found in a Channel';
  private readonly ON_SUCCESSSFUL_UPLOADED_VIDEO = 'Video was uploaded';
  private readonly ON_FAILED_UPLOADED_VIDEO =
    'There is an error in upload proccess';

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

  onChannelNotFound(channelId: string) {
    this.toastService.danger(
      `ID: ${channelId}`,
      this.ON_CHANNEL_NOT_FOUND_TITLE,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }

  onPlaylistNotFound(channelId: string, playlistId: string) {
    this.toastService.danger(
      `Channel ID: ${channelId}\n Playlist ID: ${playlistId}`,
      this.ON_PLAYLIST_NOT_FOUND_TITLE,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }

  onSuccessfulUploadedVideo(videoId: string) {
    this.toastService.success(
      `Video ID: ${videoId}`,
      this.ON_SUCCESSSFUL_UPLOADED_VIDEO,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }

  onFailedUploadedVideo(videoId: string) {
    this.toastService.danger(
      `Video ID: ${videoId}`,
      this.ON_FAILED_UPLOADED_VIDEO,
      {
        position: this.NOTIFICATION_POSITION,
      },
    );
  }
}
