import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { LayoutModule } from '@layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { ContentLayoutRoutingModule } from './content-layout-routing.module';
import { ContentLayoutComponent } from './content-layout.component';
import { BloggerModule } from './pages/blogger/blogger.module';

@NgModule({
  imports: [
    NbMenuModule,
    ContentLayoutRoutingModule,
    LayoutModule,
    ComponentsModule,
    BloggerModule,
  ],
  declarations: [ContentLayoutComponent],
})
export class ContentLayoutModule {}
