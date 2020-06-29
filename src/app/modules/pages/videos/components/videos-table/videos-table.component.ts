import { Component, Input } from '@angular/core';

import { Video } from '@data/models/video.entity';
import { VideosTableService } from './videos-table.service';

@Component({
  selector: 'videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.scss'],
})
export class VideosTableComponent {
  @Input() videos: Video[] = [];

  get columnDefs() {
    return this.service.columnDefs;
  }

  constructor(private readonly service: VideosTableService) {}
}
