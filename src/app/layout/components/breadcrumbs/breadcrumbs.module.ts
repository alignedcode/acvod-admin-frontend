import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [BreadcrumbsComponent],
  declarations: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
