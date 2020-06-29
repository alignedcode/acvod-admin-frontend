import { VideoStorageState } from './video-storage-state.enum';

export interface VideoDto {
  id: string;
  source: { originalId?: string; provider: string };

  title: string;
  description: string;

  storageState: VideoStorageState;
}
