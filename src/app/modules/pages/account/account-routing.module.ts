import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbRouteData } from '@layout/models/breadcrumb-route-data.enum';
import { AccountRoutes } from './account-routes.enum';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

export const routes: Routes = [
  {
    path: AccountRoutes.DETAILS,
    data: {
      [BreadcrumbRouteData.LABEL]: 'Account',
    },
    component: AccountDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
