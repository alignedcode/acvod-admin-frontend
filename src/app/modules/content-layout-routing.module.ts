import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/modules/auth/guards/auth.guard';
import { ContentLayoutComponent } from './content-layout.component';
import { BloggersRoutes } from './pages/bloggers/bloggers-routes.enum';
import { BloggersLoginComponent } from './pages/bloggers/pages/bloggers-login/bloggers-login.component';

const routes: Routes = [
  {
    path: 'bloggers',
    children: [
      {
        path: BloggersRoutes.AUTH,
        children: [
          {
            path: '',
            component: BloggersLoginComponent,
          },
        ],
      },
      {
        path: 'details',
        component: ContentLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/bloggers/bloggers.module').then(
            (module) => module.BloggersModule,
          ),
      },
      {
        path: '',
        redirectTo: BloggersRoutes.AUTH,
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
