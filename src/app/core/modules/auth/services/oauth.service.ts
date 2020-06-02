import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OAuthService {
  startAuthenticationFlow(authServerURI: string) {
    window.location.href = authServerURI;
  }
}
