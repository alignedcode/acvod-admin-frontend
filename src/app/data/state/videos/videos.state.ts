import { Video } from '../../models/video.entity';

export interface VideosState {
  videos: Video[];
}

export function createInitialState(): VideosState {
  return { videos: [] };
}
