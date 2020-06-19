import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthToken, NbTokenPack } from '@nebular/auth';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AuthTokenParceler {
  constructor() {}

  wrap(token: NbAuthToken): string {
    return JSON.stringify({
      name: token.getName(),
      ownerStrategyName: token.getOwnerStrategyName(),
      createdAt: token.getCreatedAt().getTime(),
      value: token.toString(),
    });
  }

  unwrap(value: string): Observable<NbAuthToken> {
    let tokenValue = '';
    let tokenOwnerStrategyName = '';
    let tokenCreatedAt: Date = null;

    const tokenPack: NbTokenPack = this.parseTokenPack(value);
    if (tokenPack) {
      tokenValue = tokenPack.value;
      tokenOwnerStrategyName = tokenPack.ownerStrategyName;
      tokenCreatedAt = new Date(Number(tokenPack.createdAt));
    }

    try {
      return of(
        new NbAuthJWTToken(tokenValue, tokenOwnerStrategyName, tokenCreatedAt),
      );
    } catch (error) {
      return throwError(error);
    }
  }

  protected parseTokenPack(value): NbTokenPack {
    try {
      return JSON.parse(value);
    } catch (e) {}
    return null;
  }
}
