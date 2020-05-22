import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';

import { BloggersRoutes } from './bloggers-routes.enum';
import { BloggersLoginComponent } from './pages/bloggers-login/bloggers-login.component';

export const routes: Routes = [
  {
    path: BloggersRoutes.AUTH,
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: BloggersLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentLayoutRoutingModule {}
