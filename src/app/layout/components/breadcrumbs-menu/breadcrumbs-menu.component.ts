import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

import { MenuItem } from '@layout/models/menu-item';
import { BreadcrumbsMenuService } from './breadcrumbs-menu.service';
import { AppRoutes } from 'app/app-route.enum';

@Component({
  selector: 'breadcrumbs-menu',
  templateUrl: './breadcrumbs-menu.component.html',
  styleUrls: ['./breadcrumbs-menu.component.scss'],
})
export class BreadcrumbsMenuComponent implements AfterViewInit {
  menuItems: MenuItem[] = [];

  readonly homeRoute = { icon: 'home-outline', url: AppRoutes.ROOT };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly menuService: BreadcrumbsMenuService,
  ) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuItems = this.menuService.createBreadcrumbs(
          this.activatedRoute.root,
        );
      });
  }
}
