import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';

import { SharedModule } from '@shared/shared.module';
import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
} from './components';
import { OneColumnLayoutComponent } from './pages';

import { LayoutRoutingService } from './services/layout-routing.service';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { DARK_THEME } from './styles/theme.dark';
import { DEFAULT_THEME } from './styles/theme.default';
import { Theme } from './styles/theme.enum';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
];

@NgModule({
  imports: [CommonModule, SharedModule, NbLayoutModule],
  exports: [CommonModule, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: Theme.DEFAULT,
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
        LayoutRoutingService,
      ],
    };
  }
}
