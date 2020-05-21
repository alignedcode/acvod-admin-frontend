import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../layout/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule, MiscellaneousModule],
  declarations: [PagesComponent],
})
export class PagesModule {}
