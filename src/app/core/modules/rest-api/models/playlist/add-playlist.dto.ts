import { PlaylistPrivacy } from './playlist.dto';

export interface AddPlaylistDto {
  title: string;
  description: string;
  privacy: PlaylistPrivacy;
}
