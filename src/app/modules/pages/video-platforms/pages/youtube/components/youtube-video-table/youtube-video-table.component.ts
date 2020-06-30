import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';

import { VideoStorageState } from '@core/modules/rest-api/models/video/video-storage-state.enum';
import { Page } from '@data/models/page';
import { YouTubeVideo } from '@data/models/video-providers/youtube/youtube-video.entity';
import { TableColumnTruncationPipe } from '../../pipes/table-column-truncation.pipe';
import { VideoStorageStatePipe } from '../../pipes/video-storage-state.pipe';

@Component({
  selector: 'youtube-video-table',
  templateUrl: './youtube-video-table.component.html',
  styleUrls: ['./youtube-video-table.component.scss'],
})
export class YouTubeVideoTableComponent implements OnInit {
  readonly ColumnMode = ColumnMode;
  readonly tableMessages = {
    emptyMessage: 'There are no videos in your playlist.',
  };

  @Input() videos: YouTubeVideo[];
  @Input() page: Page;

  @Output() setPage$ = new EventEmitter<number>();
  @Output() uploadVideo$ = new EventEmitter<string>();

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  columns: TableColumn[];

  constructor(
    private readonly truncationPipe: TableColumnTruncationPipe,
    private readonly storageStatePipe: VideoStorageStatePipe,
    private readonly datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.columns = [
      { name: 'ID', prop: 'snippet.resourceId.videoId' },
      { name: 'Title', prop: 'snippet.title' },
      {
        name: 'Description',
        prop: 'snippet.description',
        pipe: this.truncationPipe,
      },
      {
        name: 'Published At',
        prop: 'snippet.publishedAt',
        pipe: this.datePipe,
      },
      {
        name: 'Upload State',
        prop: 'storageState',
        pipe: this.storageStatePipe,
      },
      {
        name: 'Actions',
        cellTemplate: this.actionsTemplate,
        prop: 'snippet.resourceId.videoId',
      },
    ];
  }

  onUploadVideo(videoId: string) {
    this.uploadVideo$.emit(videoId);
  }

  onSetPage(page: number) {
    this.setPage$.emit(page);
  }

  isLoading({ storageState = VideoStorageState.NONE }: YouTubeVideo) {
    return storageState === VideoStorageState.IN_PROGRESS;
  }

  isUploaded({ storageState = VideoStorageState.NONE }: YouTubeVideo) {
    return storageState === VideoStorageState.SAVED;
  }
}
