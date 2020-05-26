import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthResult, NbAuthToken } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(protected tokenService: TokenService) {}

  getToken(): Observable<NbAuthToken> {
    return this.tokenService.get();
  }

  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(map((token: NbAuthToken) => token.isValid()));
  }

  onTokenChange(): Observable<NbAuthToken> {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange().pipe(
      map((token: NbAuthToken) => token.isValid()),
    );
  }

  authenticate(token: string, provider: string): Observable<NbAuthResult> {
    if (!token) {
      return of(new NbAuthResult(false));
    }

    return this.processResultToken(
      new NbAuthResult(
        true,
        null,
        null,
        null,
        null,
        new NbAuthJWTToken(token, provider),
      ),
    );
  }

  logout(): Observable<NbAuthResult> {
    return this.tokenService.clear().pipe(map(() => new NbAuthResult(true)));
  }

  private processResultToken(result: NbAuthResult) {
    if (result.isSuccess() && result.getToken()) {
      return this.tokenService.set(result.getToken()).pipe(
        map(() => {
          return result;
        }),
      );
    }

    return of(result);
  }
}
