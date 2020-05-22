import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './app-routes.enum';

export const routes: Routes = [
  {
    path: AppRoutes.ROOT,
    loadChildren: () =>
      import('./modules/content-layout.module').then(
        (module) => module.ContentLayoutModule,
      ),
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
