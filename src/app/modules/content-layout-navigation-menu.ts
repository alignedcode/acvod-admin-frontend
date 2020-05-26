import { NbMenuItem } from '@nebular/theme';

import { AccountRoutes } from './pages/account/account-routes.enum';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Account',
    icon: 'person-outline',
    children: [
      {
        title: 'Details',
        link: `/${AccountRoutes.ACCOUNT}/${AccountRoutes.DETAILS}`,
      },
    ],
  },
];
