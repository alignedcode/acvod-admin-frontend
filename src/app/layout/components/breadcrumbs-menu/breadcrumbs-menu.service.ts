import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbRouteData } from '@layout/models/breadcrumb-route-data.enum';
import { MenuItem } from '@layout/models/menu-item';

@Injectable()
export class BreadcrumbsMenuService {
  createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = [],
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbRouteData.LABEL];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
