import { InjectionToken } from '@angular/core';

import { AccountRoutes } from '@modules/pages/account/account-routes.enum';
import { NbOAuthBackendOptions } from './models/nb-oauth-backend-options.model';
import { OAuthSocialProvider } from './models/oauth-social-provider.enum';

export const OAUTH_SOCIAL_PROVIDERS = new InjectionToken<
  NbOAuthBackendOptions[]
>('oauthSocialProviders', {
  providedIn: 'root',
  factory: () => [
    {
      name: OAuthSocialProvider.GOOGLE,
      title: 'Google',
      icon: 'google-outline',
      baseEndpoint: '/api/admin/blogger/auth/google',
      redirect: {
        success: `/${AccountRoutes.ENTRY}/${AccountRoutes.AUTH}`,
        failure: `/${AccountRoutes.ENTRY}/${AccountRoutes.AUTH}`,
      },
    },
  ],
});
