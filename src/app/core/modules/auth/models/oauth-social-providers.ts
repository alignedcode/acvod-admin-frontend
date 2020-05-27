import { AccountRoutes } from '@modules/pages/account/account-routes.enum';
import { environment } from 'environments/environment';
import { NbOAuthBackendOptions } from './nb-oauth-backend-options.model';
import { OAuthSocialProvider } from './oauth-social-provider.enum';

// TODO: pass baseEndpoint and redirectURI
// TODO: turn into the provider
export const OAuthSocialProviders: ReadonlyArray<NbOAuthBackendOptions> = [
  {
    name: OAuthSocialProvider.GOOGLE,
    title: 'Google',
    icon: 'google-outline',
    baseEndpoint: `${environment.backendURI}/api/admin/blogger/auth/google`,
    redirect: {
      success: `${environment.fronendURI}/${AccountRoutes.ENTRY}/${AccountRoutes.AUTH}`,
    },
  },
];
