import { NgModule } from '@angular/core';
import { NbDialogModule } from '@nebular/theme';

import { SharedModule } from '@shared/shared.module';
import { PlaylistsRoutingModule } from './playlists-routing.module';

import { PlaylistAddModalService } from './components/playlist-add-modal/playlist-add-modal.service';
import { PlaylistsTableService } from './components/playlists-table/playlists-table.service';
import { ResolvablePlaylists } from './resolvers/playlists.resolver';
import { PlaylistsModalService } from './services/playlists-modal.service';
import { PlaylistsNotificationService } from './services/playlists-notifiaction.service';
import { PlaylistsPageService } from './services/playlists-page.service';

import { PlaylistAddModalComponent } from './components/playlist-add-modal/playlist-add-modal.component';
import { PlaylistsTableComponent } from './components/playlists-table/playlists-table.component';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';

@NgModule({
  declarations: [
    PlaylistsTableComponent,
    PlaylistsPageComponent,
    PlaylistAddModalComponent,
  ],
  entryComponents: [PlaylistAddModalComponent],
  providers: [
    PlaylistsTableService,
    PlaylistsModalService,
    PlaylistAddModalService,
    PlaylistsPageService,
    PlaylistsNotificationService,
    ResolvablePlaylists,
  ],
  imports: [NbDialogModule.forChild(), SharedModule, PlaylistsRoutingModule],
})
export class PlaylistsModule {}
