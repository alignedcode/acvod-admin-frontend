import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';

import { Page } from '@data/models/page';
import {
  YouTubeVideo,
  YouTubeVideoUploadingState,
} from '@data/models/video-providers/youtube/youtube-video.entity';
import { TableColumnTruncationPipe } from '../../pipes/table-column-truncation.pipe';

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

  constructor(private readonly truncationPipe: TableColumnTruncationPipe) {}

  ngOnInit() {
    this.columns = [
      { name: 'ID', prop: 'snippet.resourceId.videoId' },
      { name: 'Title', prop: 'snippet.title' },
      {
        name: 'Description',
        prop: 'snippet.description',
        pipe: this.truncationPipe,
      },
      { name: 'Published At', prop: 'snippet.publishedAt' },
      { name: 'Upload State', prop: 'uploadedState' },
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

  isLoading({
    uploadingState = YouTubeVideoUploadingState.NONE,
  }: YouTubeVideo) {
    return uploadingState === YouTubeVideoUploadingState.IN_PROGRESS;
  }
}
