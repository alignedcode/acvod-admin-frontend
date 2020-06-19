import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip } from 'rxjs';

import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';

@Injectable()
export class YouTubeChannelPageService {
  constructor(private readonly playlistsService: YouTubePlaylistsService) {}

  loadPlaylists(route: ActivatedRoute): Observable<any> {
    const channelId = this.getChannel(route);

    return zip(
      this.playlistsService.loadAllPlaylists(channelId),
      this.playlistsService.loadSelectedPlaylists(channelId),
    );
  }

  private getChannel({
    snapshot: { paramMap: params },
  }: ActivatedRoute): string {
    // TODO: use key from the route param enum
    return params.get('channelId');
  }
}
