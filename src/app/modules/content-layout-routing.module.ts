import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/modules/auth/guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContentLayoutComponent } from './content-layout.component';
import { AccountRoutes } from './pages/account/account-routes.enum';
import { AccountLoginComponent } from './pages/account/pages/account-login/account-login.component';

const routes: Routes = [
  {
    path: AccountRoutes.ACCOUNT,
    children: [
      {
        path: AccountRoutes.AUTH,
        children: [
          {
            path: '',
            component: AccountLoginComponent,
          },
        ],
      },
      {
        path: '',
        component: ContentLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/account/account.module').then(
            (module) => module.AccountModule,
          ),
      },
      {
        path: '',
        redirectTo: AccountRoutes.AUTH,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentLayoutRoutingModule {}
