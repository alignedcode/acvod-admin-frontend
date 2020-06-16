import { YouTubeVideoDto } from '@core/modules/rest-api/models/video-providers/youtube/youtube-video.dto';

// tslint:disable-next-line: no-empty-interface
export interface YouTubeVideo extends YouTubeVideoDto {
  uploadingState?: YouTubeVideoUploadingState;
}

export enum YouTubeVideoUploadingState {
  UPLOADED = 'uploaded',
  IN_PROGRESS = 'in-progress',
  NONE = 'none',
}
