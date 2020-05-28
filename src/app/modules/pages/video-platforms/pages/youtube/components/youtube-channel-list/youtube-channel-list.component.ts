import { Component, Input } from '@angular/core';

import { YouTubeChannel } from '@core/modules/rest-api/models/video-providers/youtube/youtube-channel.model';

@Component({
  selector: 'youtube-channel-list',
  templateUrl: './youtube-channel-list.component.html',
  styleUrls: ['./youtube-channel-list.component.scss'],
})
export class YouTubeChannelListComponent {
  @Input() channels: YouTubeChannel[];
}
