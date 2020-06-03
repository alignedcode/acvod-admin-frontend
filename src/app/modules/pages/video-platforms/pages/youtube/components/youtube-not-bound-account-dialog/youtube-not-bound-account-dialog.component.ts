import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-not-bound-account-dialog',
  templateUrl: 'youtube-not-bound-account-dialog.component.html',
  styleUrls: ['youtube-not-bound-account-dialog.component.scss'],
})
export class YouTubeNotBoundAccountDialogComponent {
  @Input() title: string;

  readonly YOUTUBE_STUDIO_LINK = 'https://studio.youtube.com/channel/';

  constructor(
    private readonly dialogReference: NbDialogRef<
      YouTubeNotBoundAccountDialogComponent
    >,
    private readonly navigationService: YouTubeRoutingService,
  ) {}

  navigateToChannelsPage() {
    this.dialogReference.close();
    this.navigationService.navigateToChannelsPage();
  }
}
