import { Injectable } from '@angular/core';
import { NbAuthToken } from '@nebular/auth';
import { Observable } from 'rxjs';

import { AuthTokenParceler } from './auth-token-parceler.service';

export interface ITokenStorage {
  get(): Observable<NbAuthToken>;
  set(token: NbAuthToken);
  clear();
}

@Injectable()
export class TokenLocalStorage implements ITokenStorage {
  protected key = 'auth_app_token';

  constructor(private parceler: AuthTokenParceler) {}

  get(): Observable<NbAuthToken> {
    const raw = localStorage.getItem(this.key);
    return this.parceler.unwrap(raw);
  }

  set(token: NbAuthToken) {
    const raw = this.parceler.wrap(token);
    localStorage.setItem(this.key, raw);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
