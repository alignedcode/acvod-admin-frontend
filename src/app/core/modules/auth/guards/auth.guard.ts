import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AccountRoutes } from '@modules/pages/account/account-routes.enum';
import { InternalAuthService } from '../services/internal-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: InternalAuthService,
    private readonly router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      catchError(() => of(false)),
      map((isValid) => {
        if (isValid) {
          return isValid;
        }

        return this.router.parseUrl(
          `/${AccountRoutes.ENTRY}/${AccountRoutes.AUTH}`,
        );
      }),
    );
  }
}
