import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { AuthTokenParceler } from './services/auth-token-parceler.service';
import { AuthService } from './services/auth.service';
import { TokenLocalStorage } from './services/token-storage';
import { TokenService } from './services/token.service';

@NgModule({
  imports: [],
  providers: [
    AuthGuard,
    TokenLocalStorage,
    TokenService,
    AuthTokenParceler,
    AuthService,
  ],
})
export class AuthModule {}
