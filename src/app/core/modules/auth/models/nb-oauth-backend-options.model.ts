import { NbAuthStrategyOptions } from '@nebular/auth';

export class NbOAuthBackendOptions extends NbAuthStrategyOptions {
  baseEndpoint?: string = '';
  redirect: { success: string; failure?: string };
  defaultErrors?: any[] = ['Something went wrong, please try again.'];
  defaultMessages?: any[] = ['You have been successfully authenticated.'];
  title?: string;
  icon?: string;
}
