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
import { Observable } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-channel-table',
  templateUrl: './youtube-channel-table.component.html',
  styleUrls: ['./youtube-channel-table.component.scss'],
})
export class YouTubeChannelTableComponent implements OnInit {
  readonly ColumnMode = ColumnMode;
  readonly tableMessages = {
    emptyMessage: 'There are no channels in your account, please choose one.',
  };

  @Input() channels$: Observable<YouTubeChannel[]>;
  @Output() removeChannel$: EventEmitter<string> = new EventEmitter();

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  columns: TableColumn[] = [];

  constructor(
    private readonly routingService: YouTubeRoutingService,
    private readonly datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    // TODO: Move into a service
    this.columns = [
      { name: 'ID', prop: 'id', minWidth: 300 },
      { name: 'Title', prop: 'title' },
      { name: 'Description', prop: 'description' },
      { name: 'Published At', prop: 'publishedAt', pipe: this.datePipe },
      { name: 'Actions', cellTemplate: this.actionsTemplate, prop: 'id' },
    ];
  }

  navigateToChannelPage(channelId: string) {
    this.routingService.navigateToChannelPage(channelId);
  }

  onRemoveChannel(channelId: string) {
    this.removeChannel$.emit(channelId);
  }
}
