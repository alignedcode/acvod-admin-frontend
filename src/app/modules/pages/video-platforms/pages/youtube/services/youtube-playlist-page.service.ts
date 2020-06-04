import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { YouTubePlaylist } from '@data/models/video-providers/youtube/youtube-playlist.entity';
import { YouTubePlaylistsService } from '@data/services/video-providers/youtube/youtube-playlists.service';
import { YouTubeQuery } from '@data/state/video-providers/youtube.query';

@Injectable()
export class YouTubePlaylistPageService {
  constructor(
    private readonly query: YouTubeQuery,
    private readonly playlistsService: YouTubePlaylistsService,
  ) {}

  getPlaylist({
    snapshot: { paramMap: params },
  }: ActivatedRoute): Observable<YouTubePlaylist> {
    return this.query.getPlaylist(
      params.get('channelId'),
      params.get('playlistId'),
    );
  }

  loadVideos({ snapshot: { paramMap: params } }: ActivatedRoute) {
    return this.playlistsService.loadPlaylistVideos(
      params.get('channelId'),
      params.get('playlistId'),
    );
  }
}
