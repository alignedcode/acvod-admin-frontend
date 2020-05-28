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
  },
  {
    title: 'Video Platforms',
    icon: 'film-outline',
    children: [
      {
        title: 'YouTube',
        link: `/${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}`,
      },
    ],
  },
];
