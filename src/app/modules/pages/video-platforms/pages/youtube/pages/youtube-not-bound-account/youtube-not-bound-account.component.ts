import { Component } from '@angular/core';

import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-not-bound-account',
  templateUrl: './youtube-not-bound-account.component.html',
  styleUrls: ['./youtube-not-bound-account.component.scss'],
})
export class YouTubeNotBoundAccountComponent {
  constructor(private readonly navigationService: YouTubeRoutingService) {}

  navigateToChannelsPage() {
    this.navigationService.navigateToChannelsPage();
  }
}
