import { YouTubeVideo } from './youtube-video.entity';

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  videoCount: number;

  videos: {
    items: YouTubeVideo[];
    nextPage?: string;
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
