import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbRouteData } from '@layout/models/breadcrumb-route-data.enum';
import { SkippedBreadcrumb } from '@layout/models/skipped-breadcrumb';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { ResolvablePlaylists } from './resolvers/playlists.resolver';

const routes: Routes = [
  {
    path: '',
    data: { [BreadcrumbRouteData.LABEL]: SkippedBreadcrumb },
    resolve: { playlists: ResolvablePlaylists },
    component: PlaylistsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistsRoutingModule {}
