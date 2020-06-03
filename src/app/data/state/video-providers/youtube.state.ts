import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';

export interface YouTubeState {
  channels: YouTubeChannel[];
}

export function createInitialState(): YouTubeState {
  return { channels: [] };
}
