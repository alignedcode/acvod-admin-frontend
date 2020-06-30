import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as Tus from 'tus-js-client';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { Route } from '@core/modules/rest-api/api/videos-uploading-http.service';
import { BACKEND_BASE_PATH } from '@core/modules/rest-api/backend-base-path.provider';
import { Video } from '@data/models/video.entity';
import { getFileType, getOnlyFileName } from './file-metadata.service';

export interface StartedUpload {
  error$: Observable<Error>;
  progress$: Observable<string>;
  success$: Observable<never>;
}

@Injectable()
export class VideoUploadingService {
  constructor(
    @Inject(BACKEND_BASE_PATH) private readonly basePath: string,
    private readonly authService: InternalAuthService,
  ) {}

  uploadVideo({ id: videoId }: Video, file: File): StartedUpload {
    const { error$, progress$, success$ } = {
      error$: new Subject<Error>(),
      progress$: new BehaviorSubject<string>('0'),
      success$: new Subject<never>(),
    };

    const fileType = getFileType(file.name);
    if (!fileType) {
      // TODO: show a notification
      throw new Error(`Can't extract the file type of '${file.name}'`);
    }

    this.authService.getToken().subscribe((token) => {
      const upload = new Tus.Upload(file, {
        endpoint: `${this.basePath}${Route.UPLOAD}`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          bloggerId: token.getPayload().bloggerId,
          videoId,
          filename: getOnlyFileName(file.name),
          filetype: fileType,
        },
        headers: {
          Authorization: `Bearer ${token.getValue()}`,
        },
        onError(error) {
          error$.next(error);
        },
        onProgress(bytesUploaded, bytesTotal) {
          progress$.next(((bytesUploaded / bytesTotal) * 100).toFixed(2));
        },
        onSuccess() {
          success$.next();
        },
      });

      upload.start();
    });

    return {
      error$: error$.asObservable(),
      progress$: progress$.asObservable(),
      success$: success$.asObservable(),
    };
  }
}
