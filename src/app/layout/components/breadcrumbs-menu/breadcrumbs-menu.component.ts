import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MenuItem } from '@layout/models/menu-item';
import { AppRoutes } from 'app/app-route.enum';
import { BreadcrumbsMenuService } from './breadcrumbs-menu.service';

@Component({
  selector: 'breadcrumbs-menu',
  templateUrl: './breadcrumbs-menu.component.html',
  styleUrls: ['./breadcrumbs-menu.component.scss'],
})
export class BreadcrumbsMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  // TODO: move to the default menu options
  readonly homeRoute = { icon: 'home-outline', url: AppRoutes.ROOT };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly menuService: BreadcrumbsMenuService,
  ) {}

  ngOnInit() {
    this.menuItems = this.menuService.createBreadcrumbs(
      this.activatedRoute.root,
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuItems = this.menuService.createBreadcrumbs(
          this.activatedRoute.root,
        );
      });
  }
}
