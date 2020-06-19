import { Injectable } from '@angular/core';
import { NbAuthToken } from '@nebular/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { TokenLocalStorage } from './token-storage';

@Injectable()
export class TokenService {
  protected token$: BehaviorSubject<
    NbAuthToken | undefined
  > = new BehaviorSubject(undefined);

  constructor(protected tokenStorage: TokenLocalStorage) {
    this.publishStoredToken();
  }

  tokenChange(): Observable<NbAuthToken> {
    return this.token$.pipe(
      filter((value) => !!value),
      share(),
    );
  }

  set(token: NbAuthToken): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return of(null);
  }

  get(): Observable<NbAuthToken> {
    return this.tokenStorage.get();
  }

  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return of(null);
  }

  protected publishStoredToken() {
    this.tokenStorage.get().subscribe(
      (token) => this.token$.next(token),
      (error) => {
        this.token$.error(error);
      },
    );
  }
}
