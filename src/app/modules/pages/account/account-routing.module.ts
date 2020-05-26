import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountRoutes } from './account-routes.enum';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

export const routes: Routes = [
  {
    path: AccountRoutes.DETAILS,
    component: AccountDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
