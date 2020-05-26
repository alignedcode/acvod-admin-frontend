import { InjectionToken } from '@angular/core';

import { environment } from 'environments/environment';

export const BASE_PATH = new InjectionToken<string>('basePath', {
  providedIn: 'root',
  factory: () => environment.backendURI,
});
