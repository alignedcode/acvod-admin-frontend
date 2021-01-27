import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AccountRoutes } from '@modules/pages/account/account-routes.enum';
import { AppRoutes } from 'app/app-route.enum';

@Injectable()
export class LayoutRoutingService {
  constructor(private readonly router: Router) {}

  navigateToAuthPage() {
    this.router.navigateByUrl(
      `${AppRoutes.ROOT}/${AccountRoutes.ENTRY}/${AccountRoutes.AUTH}`,
    );
  }
}
