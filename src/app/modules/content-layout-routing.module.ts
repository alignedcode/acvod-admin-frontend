import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/modules/auth/guards/auth.guard';
import { ContentLayoutComponent } from './content-layout.component';
import { BloggerRoutes } from './pages/blogger/blogger-routes.enum';
import { BloggerLoginComponent } from './pages/blogger/pages/blogger-login/blogger-login.component';

const routes: Routes = [
  {
    path: 'bloggers',
    children: [
      {
        path: BloggerRoutes.AUTH,
        children: [
          {
            path: '',
            component: BloggerLoginComponent,
          },
        ],
      },
      {
        path: 'details',
        component: ContentLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/blogger/blogger.module').then(
            (module) => module.BloggerModule,
          ),
      },
      {
        path: '',
        redirectTo: BloggerRoutes.AUTH,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'bloggers',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentLayoutRoutingModule {}
