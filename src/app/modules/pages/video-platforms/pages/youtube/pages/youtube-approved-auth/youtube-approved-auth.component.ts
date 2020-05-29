import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbAuthResult } from '@nebular/auth';

import { OAuthSocialProvider } from '@core/modules/auth/models/oauth-social-provider.enum';
import { OAuthSocialProviders } from '@core/modules/auth/models/oauth-social-providers';
import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { VideoPlatformsRoutes } from '@modules/pages/video-platforms/video-platforms-routes.enum';

@Component({
  selector: 'youtube-approved-auth',
  styleUrls: ['./youtube-approved-auth.component.scss'],
  templateUrl: './youtube-approved-auth.component.html',
})
export class YouTubeApprovedAuthComponent implements OnInit {
  redirectDelay: number = 350;
  showMessages: any = {};

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socilalProviders = OAuthSocialProviders;
  rememberMe = false;

  constructor(
    protected authService: InternalAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private route: ActivatedRoute,
    protected location: Location,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const accessToken = params['accessToken'];

      if (!accessToken) {
        return;
      }

      this.login(accessToken);
    });
  }

  login(accessToken: string): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService
      .authenticate(accessToken, OAuthSocialProvider.GOOGLE)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;

        if (result.isSuccess()) {
          this.messages = result.getMessages();
        } else {
          this.errors = result.getErrors();
        }

        const redirect = `${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}`;

        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);

        this.cd.detectChanges();
      });
  }

  back() {
    this.location.back();
    return false;
  }

  getSocialProviderLink(baseEndpoint: string, redirectUri: string): string {
    return `${baseEndpoint}?redirectUri=${encodeURIComponent(redirectUri)}`;
  }
}
