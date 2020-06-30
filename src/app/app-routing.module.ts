import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './app-route.enum';

export const routes: Routes = [
  {
    path: AppRoutes.ROOT,
    loadChildren: () =>
      import('./modules/content-layout.module').then(
        (module) => module.ContentLayoutModule,
      ),
  },
  { path: 'videos', loadChildren: () => import('./modules/pages/videos/videos.module').then(m => m.VideosModule) },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
