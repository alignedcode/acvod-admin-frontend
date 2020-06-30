import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { BreadcrumbsMenuComponent } from './breadcrumbs-menu.component';
import { BreadcrumbsMenuService } from './breadcrumbs-menu.service';

@NgModule({
  imports: [BreadcrumbsModule, SharedModule, RouterModule],
  exports: [BreadcrumbsMenuComponent],
  declarations: [BreadcrumbsMenuComponent],
  providers: [BreadcrumbsMenuService],
})
export class BreadcrumbsMenuModule {}
