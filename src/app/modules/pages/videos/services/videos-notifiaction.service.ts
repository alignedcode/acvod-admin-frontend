import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable()
export class VideosNotificationService {
  // TODO: move into a providable entity
  private readonly ON_FAILED_LOADED_VIDEOS =
    'There was an error in the videos loading process';

  private readonly NOTIFICATION_POSITION =
    NbGlobalPhysicalPosition.BOTTOM_RIGHT;

  constructor(private readonly toastService: NbToastrService) {}

  onFailedLoadedVideos() {
    this.toastService.danger('Videos', this.ON_FAILED_LOADED_VIDEOS, {
      position: this.NOTIFICATION_POSITION,
    });
  }
}
