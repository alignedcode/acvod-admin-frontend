import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BACKEND_BASE_PATH } from '../backend-base-path.provider';
import { AddVideoDto } from '../models/video/add-video.dto';
import { VideoDto } from '../models/video/video.dto';
import { ContentType, HttpRestService } from '../services/http-rest.service';

enum ApiRoute {
  GET_VIDEOS = '/api/admin/content/video',
  ADD_VIDEO = '/api/admin/content/video',
  REMOVE_VIDEO = '/api/admin/content/video/:videoId',
}

enum RouteParam {
  VIDEO_ID = ':videoId',
}

@Injectable()
export class VideosHttpService extends HttpRestService {
  constructor(
    @Inject(BACKEND_BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
  ) {
    super();
  }

  getAll(): Observable<VideoDto[]> {
    return this.httpClient.get<VideoDto[]>(
      `${this.basePath}${ApiRoute.GET_VIDEOS}`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  addOne(video: AddVideoDto): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>(
      `${this.basePath}${ApiRoute.GET_VIDEOS}`,
      video,
      {
        headers: this.getHeaders(),
      },
    );
  }

  removeOne(videoId: string): Observable<any> {
    const route = ApiRoute.REMOVE_VIDEO.replace(RouteParam.VIDEO_ID, videoId);

    return this.httpClient.delete<any>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
