import { NgModule } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';

import { OAuthSocialProviders } from './models/oauth-social-providers';
import { NbOAuthBackendStrategy } from './strategies/nb-oauth-backend.strategy';

@NgModule({
  imports: [
    NbAuthModule.forRoot({
      strategies: [NbOAuthBackendStrategy.setup(OAuthSocialProviders.google)],
      forms: {},
    }),
  ],
})
export class AuthModule {}
