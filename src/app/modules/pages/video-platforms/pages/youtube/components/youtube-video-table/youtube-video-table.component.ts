import { Component, Input } from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';

import { YouTubeVideo } from '@data/models/video-providers/youtube/youtube-video.entity';
import { TableColumnTruncationPipe } from '../../pipes/table-column-truncation.pipe';

@Component({
  selector: 'youtube-video-table',
  templateUrl: './youtube-video-table.component.html',
  styleUrls: ['./youtube-video-table.component.scss'],
})
export class YouTubeVideoTableComponent {
  readonly ColumnMode = ColumnMode;
  readonly tableMessages = {
    emptyMessage: 'There are no videos in your playlist.',
  };

  @Input() videos: YouTubeVideo[];

  readonly columns: TableColumn[];

  constructor(truncationPipe: TableColumnTruncationPipe) {
    this.columns = [
      { name: 'ID', prop: 'id', minWidth: 300 },
      { name: 'Title', prop: 'snippet.title' },
      {
        name: 'Description',
        prop: 'snippet.description',
        pipe: truncationPipe,
      },
      { name: 'Published At', prop: 'snippet.publishedAt' },
    ];
  }
}
