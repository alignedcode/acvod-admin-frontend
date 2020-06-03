import { YouTubePlaylist } from './youtube-playlist.entity';

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  allPlaylists: YouTubePlaylist[];
  selectedPlaylists: YouTubePlaylist[];
  statistics: {
    viewCount: string;
    commentCount: string;
    subscriberCount: string;
    videoCount: string;
  };
}
