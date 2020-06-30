export enum PlaylistPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface PlaylistDto {
  id: string;
  title: string;
  description: string;
  privacy: PlaylistPrivacy;
}
