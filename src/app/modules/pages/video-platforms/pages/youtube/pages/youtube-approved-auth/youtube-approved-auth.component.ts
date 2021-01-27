import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthSocialProvider } from '@core/modules/auth/models/oauth-social-provider.enum';
import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { VideoPlatformsRoutes } from '@modules/pages/video-platforms/video-platforms-routes.enum';
import { YouTubeAuthDialogService } from '../../services/youtube-auth-dialog.service';

@Component({
  selector: 'youtube-approved-auth',
  styleUrls: ['./youtube-approved-auth.component.scss'],
  templateUrl: './youtube-approved-auth.component.html',
})
export class YouTubeApprovedAuthComponent implements AfterViewInit {
  redirectDelay: number = 350;

  constructor(
    private authService: InternalAuthService,
    private dialogService: YouTubeAuthDialogService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit() {
    const accessToken = this.route.snapshot.queryParams['accessToken'];

    if (accessToken) {
      return this.login(accessToken);
    }

    // TODO: checkout an error name
    setTimeout(() => {
      return this.dialogService.showOnNotBoundAccountDialog();
    }, this.redirectDelay);
  }

  login(accessToken: string): void {
    this.authService
      .authenticate(accessToken, OAuthSocialProvider.GOOGLE)
      .subscribe(() => {
        const redirect = `${VideoPlatformsRoutes.ENTRY}/${VideoPlatformsRoutes.YOUTUBE}`;

        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);

        this.cd.detectChanges();
      });
  }
}
