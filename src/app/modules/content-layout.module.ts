import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { LayoutModule } from '@layout/layout.module';
import { ContentLayoutRoutingModule } from './content-layout-routing.module';
import { ContentLayoutComponent } from './content-layout.component';

@NgModule({
  imports: [NbMenuModule, ContentLayoutRoutingModule, LayoutModule],
  declarations: [ContentLayoutComponent],
})
export class ContentLayoutModule {}
