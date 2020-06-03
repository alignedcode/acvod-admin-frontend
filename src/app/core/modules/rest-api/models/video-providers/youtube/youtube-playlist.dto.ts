export interface YouTubePlaylistDto {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

interface ContentDetails {
  itemCount: number;
}

interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  localized: Localized;
}

interface Localized {
  title: string;
  description: string;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
