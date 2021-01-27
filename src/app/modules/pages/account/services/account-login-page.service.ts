import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult } from '@nebular/auth';

import { FRONTEND_BASE_PATH } from '@core/modules/auth/frontend-base-path.provider';
import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BACKEND_BASE_PATH } from '@core/modules/rest-api/backend-base-path.provider';
import { AccountRoutes } from '../account-routes.enum';

@Injectable()
export class AccountLoginPageService {
  private readonly redirectDelay: number = 350;

  constructor(
    @Inject(BACKEND_BASE_PATH) private readonly backendBasePath: string,
    @Inject(FRONTEND_BASE_PATH) private readonly frontendBasePath: string,
    private readonly authService: InternalAuthService,
    private readonly router: Router,
  ) {}

  login(accessToken: string = '') {
    if (!accessToken) {
      return;
    }

    // TODO: move the key to an enum
    this.authService.authenticate(accessToken, 'JWT').subscribe(() => {
      const redirect = `${AccountRoutes.ENTRY}`;

      setTimeout(() => {
        return this.router.navigateByUrl(redirect);
      }, this.redirectDelay);
    });
  }

  getSocialProviderLink(
    baseEndpoint: string,
    successfulRedirectUri: string,
    failureRedirectUri: string,
  ): string {
    const backendUrl = `${this.backendBasePath}${baseEndpoint}`;
    const successfulRedirectUrl = encodeURIComponent(
      `${this.frontendBasePath}${successfulRedirectUri}`,
    );
    const failedRedirectUrl = encodeURIComponent(
      `${this.frontendBasePath}${failureRedirectUri}`,
    );

    return `${backendUrl}?successfulRedirectUri=${successfulRedirectUrl}&unsuccessfulRedirectUri=${failedRedirectUrl}`;
  }
}
