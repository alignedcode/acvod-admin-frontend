export interface YouTubeChannel {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
  brandingSettings: BrandingSettings;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  title: string;
  description: string;
  publishedAt: Date;
  thumbnails: Thumbnails;
  localized: Localized;
}

interface Statistics {
  viewCount: string;
  commentCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface BrandingSettings {
  channel: { title: string; profileColor: string };
  image: { bannerImageUrl: string };
}
