import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthModule } from './modules/auth/auth.module';
import { RestApiModule } from './modules/rest-api/rest-api.module';
import { LayoutService, SeoService } from './utils';

@NgModule({
  imports: [CommonModule, AuthModule, RestApiModule.forRoot()],
  exports: [AuthModule, RestApiModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [LayoutService, SeoService],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, CoreModule.name);
  }
}
