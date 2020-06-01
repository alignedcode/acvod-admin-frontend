import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OAuthService {
  constructor(private readonly location: Location) {}

  startAuthenticationFlow(authServerURI: string) {
    window.location.href = authServerURI;
  }
}
