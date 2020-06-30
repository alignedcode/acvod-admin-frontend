import { YouTubeVideoDto } from '@core/modules/rest-api/models/video-providers/youtube/youtube-video.dto';

// tslint:disable-next-line: no-empty-interface
export interface YouTubeVideo extends YouTubeVideoDto {}

export enum VideoStorageStateName {
  SAVED = 'Saved',
  IN_PROGRESS = 'In Progress',
  NONE = `Isn't Persisted`,
}
