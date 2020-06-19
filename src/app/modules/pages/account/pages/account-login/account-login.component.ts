import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NbOAuthBackendOptions } from '@core/modules/auth/models/nb-oauth-backend-options.model';
import { OAUTH_SOCIAL_PROVIDERS } from '@core/modules/auth/oauth-social-providers.provider';
import { AccountLoginPageService } from '../../services/account-login-page.service';

@Component({
  selector: 'account-login',
  styleUrls: ['./account-login.component.scss'],
  templateUrl: './account-login.component.html',
})
export class AccountLoginComponent implements OnInit {
  constructor(
    @Inject(OAUTH_SOCIAL_PROVIDERS)
    public readonly oAuthSocialProviders: NbOAuthBackendOptions[],
    private readonly pageService: AccountLoginPageService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      // TODO: use an enum for the key
      const accessToken = params['accessToken'];

      if (!accessToken) {
        return;
      }

      this.pageService.login(accessToken);
    });
  }

  getSocialProviderLink(
    baseEndpoint: string,
    successfulRedirectUri: string,
    failureRedirectUri: string,
  ): string {
    return this.pageService.getSocialProviderLink(
      baseEndpoint,
      successfulRedirectUri,
      failureRedirectUri,
    );
  }
}
