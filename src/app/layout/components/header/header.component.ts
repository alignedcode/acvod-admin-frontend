import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { LayoutService } from '../../../core/utils';
import { LayoutRoutingService } from '@layout/services/layout-routing.service';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userPictureOnly: boolean = false;
  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly authService: InternalAuthService,
    private readonly routingService: LayoutRoutingService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
  ) {}

  ngOnInit() {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl),
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService
      .logout()
      .subscribe(() => this.routingService.navigateToAuthPage());
  }
}
