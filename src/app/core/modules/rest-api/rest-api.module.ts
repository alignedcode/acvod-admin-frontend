import { HttpClient } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { BloggerApiService } from './api/blogger-api.service';

@NgModule({
  providers: [BloggerApiService],
})
export class RestApiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RestApiModule,
      providers: [],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: RestApiModule,
    http: HttpClient,
  ) {
    throwIfAlreadyLoaded(parentModule, RestApiModule.name);
  }
}
