import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BACKEND_BASE_PATH } from '../../backend-base-path.provider';
import { ContentType, HttpRestService } from '../../services/http-rest.service';

enum ApiRoute {
  UPLOAD_VIDEO = '/api/admin/youtube/channel/:channelId/upload',
  GET_UPLOADED_VIDEOS = '/api/admin/youtube/channel/upload',
}

enum RouteParam {
  CHANNEL_ID = ':channelId',
}

// TODO: find a more simpler solution to manage routes (p.s.: builders)
@Injectable()
export class YouTubeVideoHttpService extends HttpRestService {
  constructor(
    @Inject(BACKEND_BASE_PATH) protected basePath: string,
    protected readonly httpClient: HttpClient,
  ) {
    super();
  }

  getUploadedVideosByIds(ids: string[]): Observable<string[]> {
    const route = `${ApiRoute.UPLOAD_VIDEO}?ids=${ids.join(',')}`;

    return this.httpClient.get<any>(`${this.basePath}${route}`, {
      headers: this.getHeaders(),
    });
  }

  upload(channelId: string, videoId: string): Observable<any> {
    const route = ApiRoute.UPLOAD_VIDEO.replace(
      RouteParam.CHANNEL_ID,
      channelId,
    );

    return this.httpClient.post<any>(
      `${this.basePath}${route}`,
      { videoId },
      {
        headers: this.getHeaders(),
      },
    );
  }

  protected getDefaultContentType(): string {
    return ContentType.JSON;
  }
}
