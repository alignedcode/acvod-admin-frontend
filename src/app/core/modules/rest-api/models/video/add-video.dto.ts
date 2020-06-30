import { VideoStorageState } from './video-storage-state.enum';

export interface AddVideoDto {
  source: { originalId?: string; provider: string };
  title: string;
  description: string;
  storageState?: VideoStorageState;
}
