import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';

export interface YouTubeState {
  channels: YouTubeChannel[];
  uploadableVideos: string[];
}

export function createInitialState(): YouTubeState {
  return { channels: [], uploadableVideos: [] };
}
