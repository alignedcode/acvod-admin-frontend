import { InjectionToken } from '@angular/core';

import { environment } from 'environments/environment';

export const BACKEND_BASE_PATH = new InjectionToken<string>('backendBasePath', {
  providedIn: 'root',
  factory: () => environment.backendURI,
});
