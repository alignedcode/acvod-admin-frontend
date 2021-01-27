import { PageInfo } from '@core/modules/rest-api/models/paginated-response.model';
import { YouTubeVideo } from './youtube-video.entity';

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  videoCount: number;

  videos: {
    items: YouTubeVideo[];
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: PageInfo;
  };

  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
