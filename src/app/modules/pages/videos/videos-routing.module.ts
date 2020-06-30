import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbRouteData } from '@layout/models/breadcrumb-route-data.enum';
import { SkippedBreadcrumb } from '@layout/models/skipped-breadcrumb';
import { VideosPageComponent } from './pages/videos-page/videos-page.component';
import { ResolvableVideos } from './resolvers/videos.resolver';

const routes: Routes = [
  {
    path: '',
    data: { [BreadcrumbRouteData.LABEL]: SkippedBreadcrumb },
    resolve: { videos: ResolvableVideos },
    component: VideosPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
