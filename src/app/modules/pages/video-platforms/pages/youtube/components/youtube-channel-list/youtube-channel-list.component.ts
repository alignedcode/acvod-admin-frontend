import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeRoutingService } from '../../services/youtube-routing.service';

@Component({
  selector: 'youtube-channel-list',
  templateUrl: './youtube-channel-list.component.html',
  styleUrls: ['./youtube-channel-list.component.scss'],
})
export class YouTubeChannelListComponent implements OnInit {
  @Input() channels$: Observable<YouTubeChannel[]>;

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  columns: TableColumn[] = [];

  constructor(private readonly routingService: YouTubeRoutingService) {}

  ngOnInit(): void {
    // TODO: Move into a service
    this.columns = [
      { name: 'ID', prop: 'id' },
      { name: 'Title', prop: 'title' },
      { name: 'Description', prop: 'description' },
      { name: 'Published At', prop: 'publishedAt' },
      { name: 'Actions', cellTemplate: this.actionsTemplate, prop: 'id' },
    ];
  }

  navigateToChannelPage(channelId: string) {
    this.routingService.naviageteToChannelPage(channelId);
  }
}
