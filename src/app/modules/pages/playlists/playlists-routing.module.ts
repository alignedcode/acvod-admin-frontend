import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbRouteData } from '@layout/models/breadcrumb-route-data.enum';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { ResolvablePlaylists } from './resolvers/playlists.resolver';

const routes: Routes = [
  {
    path: 'content',
    data: { [BreadcrumbRouteData.LABEL]: 'Content' },
    children: [
      {
        path: '',
        redirectTo: 'playlist',
      },
      {
        path: 'playlist',
        data: { [BreadcrumbRouteData.LABEL]: 'Playlists' },
        resolve: { playlists: ResolvablePlaylists },
        component: PlaylistsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistsRoutingModule {}
