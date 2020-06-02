import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'youtube-add-channel-card',
  templateUrl: 'youtube-add-channel-card.component.html',
  styleUrls: ['./youtube-add-channel-card.component.scss'],
})
export class YouTubeAddChannelCardComponent {
  @Output() addChannel$ = new EventEmitter();

  constructor() {}

  onAddChannel() {
    this.addChannel$.emit(null);
  }
}
