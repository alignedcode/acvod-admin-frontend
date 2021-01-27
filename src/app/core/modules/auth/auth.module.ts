import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthTokenParceler } from './services/auth-token-parceler.service';
import { InternalAuthService } from './services/internal-auth.service';
import { OAuthService } from './services/oauth.service';
import { TokenLocalStorage } from './services/token-storage';
import { TokenService } from './services/token.service';

@NgModule({
  imports: [],
  providers: [
    AuthGuard,
    TokenLocalStorage,
    TokenService,
    AuthTokenParceler,
    InternalAuthService,
    OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
