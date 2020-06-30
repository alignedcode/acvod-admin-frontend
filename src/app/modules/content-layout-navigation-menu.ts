import { NbMenuItem } from '@nebular/theme';

import { AccountRoutes } from './pages/account/account-routes.enum';
import { VideoPlatformsRoutes } from './pages/video-platforms/video-platforms-routes.enum';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Account',
    icon: 'person-outline',
    children: [
      {
        title: 'Details',
        link: `/${AccountRoutes.ENTRY}/${AccountRoutes.DETAILS}`,
      },
    ],
    home: true,
  },
  {
    title: 'Content',
    group: true,
  },
  {
    title: 'Videos',
    icon: 'play-circle-outline',
    link: `/content/video`,
  },
  {
    title: 'Playlists',
    icon: 'list-outline',
    link: `/content/playlist`,
  },
  {
    title: 'YouTube',
    icon: 'film-outline',
    link: `/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}`,
    children: [
      {
        title: 'Channels',
        icon: 'folder-outline',
        link: `/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}/${VideoPlatformsRoutes.YOUTUBE_CHANNELS}`,
      },
    ],
  },
];
