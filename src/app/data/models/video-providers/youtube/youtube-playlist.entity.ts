export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  videoCount: number;
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