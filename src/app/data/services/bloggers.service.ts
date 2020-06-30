import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { InternalAuthService } from '@core/modules/auth/services/internal-auth.service';
import { BloggersHttpService } from '@core/modules/rest-api/api/bloggers-http.service';
import { BloggerDto } from '@core/modules/rest-api/models/blogger.dto';
import { Blogger } from '@data/models/blogger.entity';
import { BloggerStore } from '@data/state/blogger/blogger.store';
import { YouTubeStore } from '@data/state/video-providers/youtube.store';

@Injectable()
export class BloggersService {
  constructor(
    private readonly bloggersApiService: BloggersHttpService,
    private readonly authService: InternalAuthService,
    private readonly bloggerStore: BloggerStore,
    private readonly youtubeStore: YouTubeStore,
  ) {}

  getBloggerId(): Observable<string> {
    return this.authService
      .getToken()
      .pipe(map((token) => token.getPayload().bloggerId));
  }

  loadBlogger(bloggerId: string): Observable<BloggerDto> {
    return this.bloggersApiService.getBlogger(bloggerId).pipe(
      tap((blogger) => {
        this.bloggerStore.update({
          blogger: this.mapBloggerDtoToEntity(blogger),
        });
        this.youtubeStore.reset();
      }),
    );
  }

  private mapBloggerDtoToEntity({
    id,
    account: { email, firstName, lastName },
    applicationKey,
  }: BloggerDto): Blogger {
    return { id, email, firstName, lastName, applicationKey };
  }
}
