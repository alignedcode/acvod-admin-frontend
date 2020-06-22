import { Playlist } from '../../models/playlist.entity';

export interface PlaylistsState {
  playlists: Playlist[];
}

export function createInitialState(): PlaylistsState {
  return { playlists: [] };
}
