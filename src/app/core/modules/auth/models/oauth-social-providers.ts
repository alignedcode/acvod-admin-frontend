import { NbOAuthBackendOptions } from './nb-oauth-backend-options.model';
import { OAuthSocialProvider } from './oauth-social-provider.enum';

// TODO: pass baseEndpoint and redirectURI
// TODO: turn into the provider
export const OAuthSocialProviders: ReadonlyArray<NbOAuthBackendOptions> = [
  {
    name: OAuthSocialProvider.GOOGLE,
    title: 'Google',
    icon: 'google-outline',
    baseEndpoint:
      'http://ec2-18-191-255-140.us-east-2.compute.amazonaws.com:443/api/admin/blogger/auth/google',
    redirect: { success: 'http://localhost:4200/bloggers/auth' },
  },
];
