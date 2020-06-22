import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { VideoStorageState } from '@core/modules/rest-api/models/video-providers/youtube/youtube-video.dto';
import { YouTubeChannel } from '@data/models/video-providers/youtube/youtube-channel.entity';
import { YouTubeState } from './youtube.state';
import { YouTubeStore } from './youtube.store';

@Injectable()
export class YouTubeQuery extends Query<YouTubeState> {
  channels$ = this.select('channels');
  hasChannels$ = this.select('channels').pipe(
    map((channels) => channels.length > 0),
  );

  uploadableVideos$ = this.select('uploadableVideos');

  constructor(store: YouTubeStore) {
    super(store);
  }

  getChannelValue(channelId: string): YouTubeChannel {
    return this.getValue().channels.find(({ id }) => id === channelId);
  }

  getChannel(channelId: string): Observable<YouTubeChannel> {
    return this.channels$.pipe(
      map((channels) => channels.find(({ id }) => channelId === id)),
    );
  }

  getUnselectedPlaylistsInChannel(channelId: string) {
    return this.channels$.pipe(
      map((channels) => {
        const { allPlaylists = [], selectedPlaylists = [] } = channels.find(
          ({ id }) => id === channelId,
        );

        return allPlaylists.filter(
          ({ id }) =>
            !selectedPlaylists.some(({ id: selectedId }) => id === selectedId),
        );
      }),
    );
  }

  // TODO: use combineLatest
  getPlaylist(channelId: string, playlistId: string) {
    return this.select().pipe(
      map(({ channels, uploadableVideos }) => ({
        channel: channels.find(({ id }) => channelId === id),
        uploadableVideos,
      })),
      map(({ channel: { allPlaylists }, uploadableVideos }) => {
        const foundPlaylist = allPlaylists.find(({ id }) => id === playlistId);

        if (foundPlaylist) {
          return {
            ...foundPlaylist,
            videos: {
              ...foundPlaylist.videos,
              items: [
                ...foundPlaylist.videos.items.filter(
                  ({
                    snippet: {
                      resourceId: { videoId },
                    },
                  }) => !uploadableVideos.includes(videoId),
                ),
                ...foundPlaylist.videos.items
                  .filter(({ snippet: { resourceId: { videoId } } }) =>
                    uploadableVideos.includes(videoId),
                  )
                  .map((video) => ({
                    ...video,
                    storageState: VideoStorageState.IN_PROGRESS,
                  })),
              ],
            },
          };
        }

        return foundPlaylist;
      }),
    );
  }

  getPlaylistValue(channelId: string, playlistId: string) {
    const foundChannel = this.getChannelValue(channelId);

    if (!foundChannel) {
      return undefined;
    }

    return foundChannel.allPlaylists.find(({ id }) => id === playlistId);
  }

  getUploadableVideosValue() {
    return this.getValue().uploadableVideos;
  }
}
