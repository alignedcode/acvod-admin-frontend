import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { YouTubeNotBoundAccountDialogComponent } from '../components/youtube-not-bound-account-dialog/youtube-not-bound-account-dialog.component';

@Injectable()
export class YouTubeAuthDialogService {
  constructor(private dialogService: NbDialogService) {}

  showOnNotBoundAccountDialog() {
    this.dialogService.open(YouTubeNotBoundAccountDialogComponent, {
      context: { title: `Can't found a bound Channel` },
    });
  }
}
