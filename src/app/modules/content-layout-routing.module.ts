import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/modules/auth/guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContentLayoutComponent } from './content-layout.component';
import { AccountShortSummaryRoutes } from './pages/account-short-summary/account-short-summary-routes.enum';
import { AccountRoutes } from './pages/account/account-routes.enum';
import { AccountLoginComponent } from './pages/account/pages/account-login/account-login.component';
import { VideoPlatformsRoutes } from './pages/video-platforms/video-platforms-routes.enum';

const routes: Routes = [
  {
    path: AccountShortSummaryRoutes.ENTRY,
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AccountRoutes.ENTRY,
    children: [
      {
        path: AccountRoutes.AUTH,
        component: AccountLoginComponent,
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
    ],
  },
  {
    path: VideoPlatformsRoutes.ENTRY,
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/video-platforms/video-platforms.module').then(
        (module) => module.VideoPlatformsModule,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: VideoPlatformsRoutes.ENTRY,
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
