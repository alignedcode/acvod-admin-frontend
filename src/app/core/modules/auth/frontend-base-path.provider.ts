import { InjectionToken } from '@angular/core';

import { environment } from 'environments/environment';

export const FRONTEND_BASE_PATH = new InjectionToken<string>(
  'frontendBasePath',
  {
    providedIn: 'root',
    factory: () => environment.fronendURI,
  },
);
